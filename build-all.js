import { execSync } from "child_process";
import { readdirSync, existsSync } from "fs";

const games = readdirSync(".").filter(f => 
    !["node_modules", ".github", "styles", "img", "src"].includes(f) &&
    existsSync(`${f}/tsconfig.json`)
);

for (const game of games) {
    console.log(`Building ${game}...`);
    execSync("npm install && npm run build", { cwd: game, stdio: "inherit" });
}