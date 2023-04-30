import { command } from "bdsx/command";
import { LobbySpawn } from "..";
import { CommandPermissionLevel, CommandPosition } from "bdsx/bds/command";
import { bool_t, int32_t } from "bdsx/nativetype";
import { send } from "./utils/message";
import { bedrockServer } from "bdsx/launcher";

command.register("spawn", "Teleport you to the spawn")
.overload((p, o) => {
    const player = o.getEntity();
    if (player === null) {
        send.error(`This command can't use in console`);
        return;
    }
    if (!player.isPlayer()) return;

    LobbySpawn.spawn(player);
}, {});

command.register("lobby", "Teleport you to the lobby")
.overload((p, o) => {
    const player = o.getEntity();
    if (player === null) {
        send.error(`This command can't use in console`);
        return;
    }
    if (!player.isPlayer()) return;

    LobbySpawn.spawn(player);
}, {});

command.register("setspawn", "Change your world spawn.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    LobbySpawn.setPosition(p.spawnPoint.getPosition(o));
    LobbySpawn.save();
}, {
    spawnPoint: CommandPosition,
})
.overload((p, o) => {
    LobbySpawn.setTimeout(p.value);
    LobbySpawn.save();
}, {
    setTimeout: command.enum("LBE_timeout", "timeout"),
    value: int32_t,
})
.overload((p, o) => {
    LobbySpawn.setJoinSpawn(p.value);
    LobbySpawn.save();
}, {
    setJoinSpawn: command.enum("LBE_joinspawn", "joinspawn"),
    value: bool_t,
})
.overload((p, o) => {
    LobbySpawn.setPosition(bedrockServer.level.getDefaultSpawn());
    LobbySpawn.save();
}, {
    reload: command.enum("LBE_reload", "reload"),
});