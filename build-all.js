import { execSync } from "child_process";
import { readdirSync, existsSync, mkdirSync, cpSync } from "fs";

const games = readdirSync(".").filter(f => 
    !["node_modules", ".github", "styles", "img", "src"].includes(f) &&
    existsSync(`${f}/package.json`)
);

mkdirSync("public", { recursive: true });

// copy root level files to public
cpSync("index.html", "public/index.html");
cpSync("styles", "public/styles", { recursive: true });
cpSync("img", "public/img", { recursive: true });
cpSync("src", "public/src", { recursive: true });

for (const game of games) {
    console.log(`Building ${game}...`);
    execSync(`npm install && npm run build`, { cwd: game, stdio: "inherit" });

    // copy game folder to public
    mkdirSync(`public/${game}`, { recursive: true });
    cpSync(`${game}`, `public/${game}`, { recursive: true });
}