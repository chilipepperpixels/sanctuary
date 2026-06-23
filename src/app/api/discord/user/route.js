import { NextResponse } from "next/server";

const BADGES = [
    { bit: 1 << 0, label: "Discord Staff" },
    { bit: 1 << 1, label: "Partnered Server Owner" },
    { bit: 1 << 2, label: "HypeSquad Events" },
    { bit: 1 << 3, label: "Bug Hunter Level 1" },
    { bit: 1 << 6, label: "HypeSquad Bravery" },
    { bit: 1 << 7, label: "HypeSquad Brilliance" },
    { bit: 1 << 8, label: "HypeSquad Balance" },
    { bit: 1 << 9, label: "Early Supporter" },
    { bit: 1 << 14, label: "Bug Hunter Level 2" },
    { bit: 1 << 16, label: "Verified Bot" },
    { bit: 1 << 17, label: "Early Verified Bot Developer" },
    { bit: 1 << 18, label: "Moderator Programs Alumni" },
    { bit: 1 << 22, label: "Active Developer" },
]

function getAvatarUrl(user) {
    if (!user.avatar) {
        return getDefaultAvatarUrl(user);
    }

    const extension = user.avatar.startsWith("a_") ? "gif" : "png";

    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`;
}

function getDefaultAvatarUrl(user) {
    const avatarIndex =
        user.discriminator && user.discriminator !== "0"
            ? Number(user.discriminator) % 5
            : Number((BigInt(user.id) >> 22n) % 6n);

    return `https://cdn.discordapp.com/embed/avatars/${avatarIndex}.png`;
}

function getBannerUrl(user) {
    if (!user.banner) {
        return null;
    }

    const extension = user.banner.startsWith("a_") ? "gif" : "png";

    return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${extension}?size=512`;
}

function getBadges(publicFlags = 0) {
    return BADGES.filter((badge) => publicFlags & badge.bit).map(
        (badge) => badge.label,
    );
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !/^\d{17,20}$/.test(id)) {
        return NextResponse.json(
            { error: "Valid Discord user ID required." },
            { status: 400 },
        );
    }

    if (!process.env.DISCORD_BOT_TOKEN) {
        return NextResponse.json(
            { error: "Discord bot token is not configured." },
            { status: 500 },
        );
    }

    const response = await fetch(`https://discord.com/api/v10/users/${id}`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "Discord user lookup failed." },
            { status: response.status },
        );
    }
    const user = await response.json();

    return NextResponse.json({
        id: user.id,
        username: user.username,
        globalName: user.global_name,
        avatarUrl: getAvatarUrl(user),
        bannerUrl: getBannerUrl(user),
        accentColor: user.accent_color,
        bot: Boolean(user.bot),
        publicFlags: user.public_flags ?? 0,
        badges: getBadges(user.public_flags ?? 0),
    });
}
