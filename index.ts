import { events } from "bdsx/event";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { Player } from "bdsx/bds/player";
import { DimensionId } from "bdsx/bds/actor";
import { bedrockServer } from "bdsx/launcher";
import { send } from "./src/utils/message";
import * as path from "path";
import * as fs from "fs";

const timeout = new Map<Player, NetworkIdentifier>();

let config: {
    timeout?: number;
    joinspawn?: boolean;
    position: Vec3;
} = {
    joinspawn: false,
    timeout: 0,
    position: Vec3.create(0, 0, 0),
};

const configPath = path.join(__dirname, "config.json");

try {
    config = require(configPath);
} catch(err) {}

export namespace LobbySpawn {

    export function isJoinSpawn(): boolean {
        return config.joinspawn ?? false;
    }

    export function getTimeout(): number|null {
        if (!config.timeout) return null;
        if (config.timeout < 1) return null;
        return config.timeout;
    }

    export function getPosition(): Vec3 {
        return config.position;
    }

    export function setJoinSpawn(value: boolean): void {
        config.joinspawn=value;
    }

    export function setTimeout(seaconds: number|null): void {
        if (seaconds === null) {
            config.timeout=0;
            return;
        }
        if (seaconds < 1) {
            config.timeout=0;
            return;
        }

        config.timeout=seaconds;
    }

    export function setPosition(position: BlockPos|Vec3): void {
        const pos = Vec3.create(position.x, position.y, position.z);
        config.position=pos;
        bedrockServer.level.setDefaultSpawn(BlockPos.create(config.position));
    }

    export function spawn(player: Player) {
        const pos = Vec3.create(LobbySpawn.getPosition()).floor();
        player.teleport(pos, DimensionId.Overworld);
    }

    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
    }
}


events.playerJoin.on((ev) => {
    if (LobbySpawn.isJoinSpawn()) LobbySpawn.spawn(ev.player);
});

events.serverOpen.on(() => {
    require("./src/index");
    LobbySpawn.setPosition(bedrockServer.level.getDefaultSpawn());
    send.success("Started!");
});

events.serverClose.on(() => {
    LobbySpawn.save(true);
});