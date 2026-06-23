"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

const EMPTY_FILES = [
  { text: "", fileName: "" },
  { text: "", fileName: "" },
  { text: "", fileName: "" },
];
const TMB_HEADERS = ["dateTime", "character", "itemID", "offspec", "id"];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  rows.push(row);

  return rows.filter((csvRow) =>
    csvRow.some((value) => value.trim().length > 0),
  );
}

function toCsv(rows) {
  return rows
    .map((row) =>
      row
        .map((value) => {
          const text = String(value ?? "");
          const needsQuotes = /[",\r\n]/.test(text);

          if (!needsQuotes) {
            return text;
          }

          return `"${text.replaceAll('"', '""')}"`;
        })
        .join(","),
    )
    .join("\n");
}

function normalizeHeader(value) {
  return value.trim().toLocaleLowerCase();
}

function normalizePlayerName(value) {
  return value.trim().split("-")[0];
}

function getIndex(headers, columnName) {
  return headers.findIndex((header) => normalizeHeader(header) === columnName);
}

function getValue(row, index) {
  return index >= 0 ? row[index] || "" : "";
}

function normalizeDate(value) {
  return value.trim().replaceAll("/", "-");
}

function responseToOffspec(value) {
  return value.toLocaleLowerCase().includes("offspec") ? "1" : "0";
}

function normalizeRows(rows) {
  if (rows.length === 0) {
    return [];
  }

  const [headers, ...dataRows] = rows;
  const dateTimeIndex = getIndex(headers, "datetime");
  const characterIndex = getIndex(headers, "character");
  const playerIndex = getIndex(headers, "player");
  const dateIndex = getIndex(headers, "date");
  const itemIdIndex = getIndex(headers, "itemid");
  const responseIndex = getIndex(headers, "response");
  const offspecIndex = getIndex(headers, "offspec");

  if (characterIndex >= 0 && itemIdIndex >= 0) {
    return dataRows.map((row) => [
      normalizeDate(getValue(row, dateTimeIndex)),
      normalizePlayerName(getValue(row, characterIndex)),
      getValue(row, itemIdIndex),
      getValue(row, offspecIndex) || "0",
      getValue(row, getIndex(headers, "id")),
    ]);
  }

  if (playerIndex >= 0 && itemIdIndex >= 0) {
    return dataRows.map((row) => [
      normalizeDate(getValue(row, dateIndex)),
      normalizePlayerName(getValue(row, playerIndex)),
      getValue(row, itemIdIndex),
      responseToOffspec(getValue(row, responseIndex)),
      getValue(row, getIndex(headers, "id")),
    ]);
  }

  return dataRows.map((row) => [
    normalizeDate(row[0] || ""),
    normalizePlayerName(row[1] || ""),
    row[1] || "",
    "0",
    "",
  ]);
}

function mergeCsvFiles(files, deduplicate) {
  const normalizedRows = files
    .map((file) => parseCsv(file.text))
    .filter((rows) => rows.length > 0)
    .flatMap((rows) => normalizeRows(rows))
    .filter((row) => row[1] || row[2]);

  if (normalizedRows.length === 0) {
    return { rows: [], output: "", count: 0 };
  }

  const seenNames = new Set();
  const mergedRows = deduplicate
    ? normalizedRows.filter((row) => {
        const playerKey = normalizePlayerName(row[1] || "").toLocaleLowerCase();
        const itemKey = (row[2] || "").trim().toLocaleLowerCase();
        const lootKey = `${playerKey}:${itemKey}`;

        if (!playerKey || !itemKey || seenNames.has(lootKey)) {
          return false;
        }

        seenNames.add(lootKey);
        return true;
      })
    : normalizedRows;

  const sortedRows = [...mergedRows].sort((left, right) =>
    (left[1] || "").localeCompare(right[1] || "", undefined, {
      sensitivity: "base",
    }),
  );
  const rows = [TMB_HEADERS, ...sortedRows];

  return {
    rows,
    output: toCsv(rows),
    count: sortedRows.length,
  };
}

export default function CsvMerger() {
  const [files, setFiles] = useState(EMPTY_FILES);
  const [deduplicate, setDeduplicate] = useState(true);
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [viewCount, setViewCount] = useState(null);
  const [viewCountStatus, setViewCountStatus] = useState("idle");
  const downloadRef = useRef(null);

  const result = useMemo(
    () => mergeCsvFiles(files, deduplicate),
    [files, deduplicate],
  );

  function updateFile(index, changes) {
    setFiles((currentFiles) =>
      currentFiles.map((file, fileIndex) =>
        fileIndex === index ? { ...file, ...changes } : file,
      ),
    );
  }

  async function handleUpload(index, event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const text = await selectedFile.text();
    updateFile(index, { text, fileName: selectedFile.name });
  }

  async function copyOutput() {
    if (!result.output) {
      return;
    }

    await navigator.clipboard.writeText(result.output);
    setCopyLabel("Copied");
    window.setTimeout(() => setCopyLabel("Copy"), 1200);
  }

  function downloadOutput() {
    if (!result.output) {
      return;
    }

    const blob = new Blob([result.output], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = downloadRef.current;

    link.href = url;
    link.download = "merged.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function revealViewCount() {
    if (viewCountStatus === "loading" || viewCount !== null) {
      return;
    }

    setViewCountStatus("loading");

    try {
      const response = await fetch("/api/views/public");

      if (!response.ok) {
        throw new Error("Failed to load view count");
      }

      const data = await response.json();
      setViewCount(data.totalViews ?? 0);
      setViewCountStatus("ready");
    } catch {
      setViewCountStatus("error");
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="brand-link">
          <Image
            src="/2bpepperlogo.png"
            alt="Pepper's Sanctuary"
            width={300}
            height={72}
            priority
          />
        </Link>
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/osrs">OSRS Stats</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/csvmerger" style={{ color: "#f41ee9" }}>
            CSV Merger
          </Link>
          <Link href="/discord-lookup">Discord Lookup</Link>
        </div>
      </nav>

      <div className="page-shell csv-shell">
        <div className="csv-workspace">
          <aside className="csv-character">
            <button
              aria-label="Reveal site view count"
              className="csv-counter-trigger"
              onClick={revealViewCount}
              onFocus={revealViewCount}
              onMouseEnter={revealViewCount}
              type="button"
            >
              <Image
                src="/2b-standing-bg-removed-flipped.gif"
                alt=""
                width={260}
                height={360}
                unoptimized
              />
              <span className="csv-view-counter" role="status">
                {viewCountStatus === "error"
                  ? "Signal lost"
                  : viewCount === null
                    ? "Counting..."
                    : `${viewCount.toLocaleString()} views`}
              </span>
            </button>
          </aside>

          <main>
            <div className="csv-header">
              <p className="project-eyebrow">Tools</p>
              <h1>CSV Merger</h1>
            </div>

            <section className="csv-panel" aria-label="CSV inputs">
              <div className="csv-input-grid">
                {files.map((file, index) => (
                  <div className="csv-input-block" key={index}>
                    <div className="csv-input-heading">
                      <h2>File {index + 1}</h2>
                      {file.fileName && <span>{file.fileName}</span>}
                    </div>

                    <textarea
                      value={file.text}
                      onChange={(event) =>
                        updateFile(index, { text: event.target.value })
                      }
                      placeholder="dateTime,character,itemID,offspec,id&#10;2026-06-05,Besor,104431,0,123"
                      spellCheck="false"
                    />

                    <label className="csv-upload">
                      <input
                        accept=".csv,text/csv"
                        onChange={(event) => handleUpload(index, event)}
                        type="file"
                      />
                      Upload CSV
                    </label>
                  </div>
                ))}
              </div>

              <div className="csv-controls">
                <label className="csv-checkbox">
                  <input
                    checked={deduplicate}
                    onChange={(event) => setDeduplicate(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Deduplicate by player + itemID</span>
                </label>

                <div className="csv-stats">
                  <span>{result.count} rows</span>
                  <span>{result.rows.length ? "Sorted A-Z" : "Waiting"}</span>
                </div>
              </div>
            </section>

            <section className="csv-panel" aria-label="Merged CSV output">
              <div className="csv-output-heading">
                <h2>Merged Output</h2>
                <div className="csv-actions">
                  <button
                    disabled={!result.output}
                    onClick={copyOutput}
                    type="button"
                  >
                    {copyLabel}
                  </button>
                  <button
                    disabled={!result.output}
                    onClick={downloadOutput}
                    type="button"
                  >
                    Download
                  </button>
                  <a aria-hidden="true" ref={downloadRef} />
                </div>
              </div>

              <textarea
                className="csv-output"
                readOnly
                value={result.output}
                placeholder="Merged CSV appears here."
                spellCheck="false"
              />
            </section>
            <section className="csv-info-card" aria-labelledby="csv-info-title">
              <div className="csv-info-portrait">
                <Image
                  src="/ledgerette-csv-tool.png"
                  alt="Ledgerette, keeper of records"
                  width={360}
                  height={360}
                  priority
                />
              </div>

              <div className="csv-info-copy">
                <p className="project-eyebrow">Drumroll Project</p>
                <h2 id="csv-info-title">Ledgerette CSV Tool</h2>
                <p>
                  This tool was created to help loot management in
                  Drumroll@GaralonEU. This merger creates a TMB ready CSV file
                  from RCLootCouncil and Gargul. This is a passion project, not
                  for commercial use. The program executes specific tasks in
                  order to make these files readable and usable on
                  ThatsMyBis.com.
                </p>

                <div className="csv-info-tags" aria-label="Tool capabilities">
                  <span>RCLC</span>
                  <span>Gargul</span>
                  <span>TMB Ready</span>
                  <span>Loot Dedupe</span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
