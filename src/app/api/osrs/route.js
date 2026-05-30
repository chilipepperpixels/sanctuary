// src/app/api/osrs/route.js

const SKILLS = [
  "Overall",
  "Attack",
  "Defence",
  "Strength",
  "Hitpoints",
  "Ranged",
  "Prayer",
  "Magic",
  "Cooking",
  "Woodcutting",
  "Fletching",
  "Fishing",
  "Firemaking",
  "Crafting",
  "Smithing",
  "Mining",
  "Herblore",
  "Agility",
  "Thieving",
  "Slayer",
  "Farming",
  "Runecraft",
  "Hunter",
  "Construction",
  "Sailing",
];

const HISCORE_URLS = {
  normal: "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws",
  ironman: "https://secure.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "Bowosette";
  const accountType = searchParams.get("type") || "normal";
  const hiscoreUrl = HISCORE_URLS[accountType] || HISCORE_URLS.normal;

  let res;

  try {
    res = await fetch(
      `${hiscoreUrl}?player=${encodeURIComponent(username)}`
    );
  } catch {
    return Response.json({ error: "Could not load OSRS stats" }, { status: 500 });
  }

  if (!res.ok) {
    return Response.json({ error: "Could not load OSRS stats" }, { status: 500 });
  }

  const text = await res.text();

  const stats = text
    .trim()
    .split("\n")
    .slice(0, SKILLS.length)
    .map((line, index) => {
      const [rank, level, xp] = line.split(",");

      return {
        name: SKILLS[index],
        rank: Number(rank),
        level: Number(level),
        xp: Number(xp),
      };
    });

  return Response.json({ username, accountType, stats });
}
