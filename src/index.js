"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const __1 = require("..");
const command_2 = require("bdsx/bds/command");
const nativetype_1 = require("bdsx/nativetype");
const message_1 = require("./utils/message");
const launcher_1 = require("bdsx/launcher");
command_1.command.register("spawn", "Teleport you to the spawn")
    .overload((p, o) => {
    const player = o.getEntity();
    if (player === null) {
        message_1.send.error(`This command can't use in console`);
        return;
    }
    if (!player.isPlayer())
        return;
    __1.LobbySpawn.spawn(player);
}, {});
command_1.command.register("lobby", "Teleport you to the lobby")
    .overload((p, o) => {
    const player = o.getEntity();
    if (player === null) {
        message_1.send.error(`This command can't use in console`);
        return;
    }
    if (!player.isPlayer())
        return;
    __1.LobbySpawn.spawn(player);
}, {});
command_1.command.register("setspawn", "Change your world spawn.", command_2.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    __1.LobbySpawn.setPosition(p.spawnPoint.getPosition(o));
    __1.LobbySpawn.save();
}, {
    spawnPoint: command_2.CommandPosition,
})
    .overload((p, o) => {
    __1.LobbySpawn.setTimeout(p.value);
    __1.LobbySpawn.save();
}, {
    setTimeout: command_1.command.enum("LBE_timeout", "timeout"),
    value: nativetype_1.int32_t,
})
    .overload((p, o) => {
    __1.LobbySpawn.setJoinSpawn(p.value);
    __1.LobbySpawn.save();
}, {
    setJoinSpawn: command_1.command.enum("LBE_joinspawn", "joinspawn"),
    value: nativetype_1.bool_t,
})
    .overload((p, o) => {
    __1.LobbySpawn.setPosition(launcher_1.bedrockServer.level.getDefaultSpawn());
    __1.LobbySpawn.save();
}, {
    reload: command_1.command.enum("LBE_reload", "reload"),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QywwQkFBZ0M7QUFDaEMsOENBQTJFO0FBQzNFLGdEQUFrRDtBQUNsRCw2Q0FBdUM7QUFDdkMsNENBQThDO0FBRTlDLGlCQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQztLQUNyRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ2pCLGNBQUksQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNoRCxPQUFPO0tBQ1Y7SUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUFFLE9BQU87SUFFL0IsY0FBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFUCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsMkJBQTJCLENBQUM7S0FDckQsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNqQixjQUFJLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDaEQsT0FBTztLQUNWO0lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFBRSxPQUFPO0lBRS9CLGNBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsaUJBQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLDBCQUEwQixFQUFFLGdDQUFzQixDQUFDLFFBQVEsQ0FBQztLQUN4RixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixjQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsY0FBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3RCLENBQUMsRUFBRTtJQUNDLFVBQVUsRUFBRSx5QkFBZTtDQUM5QixDQUFDO0tBQ0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsY0FBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3RCLENBQUMsRUFBRTtJQUNDLFVBQVUsRUFBRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDO0lBQ2xELEtBQUssRUFBRSxvQkFBTztDQUNqQixDQUFDO0tBQ0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsY0FBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsY0FBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3RCLENBQUMsRUFBRTtJQUNDLFlBQVksRUFBRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDO0lBQ3hELEtBQUssRUFBRSxtQkFBTTtDQUNoQixDQUFDO0tBQ0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsY0FBVSxDQUFDLFdBQVcsQ0FBQyx3QkFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQzlELGNBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0QixDQUFDLEVBQUU7SUFDQyxNQUFNLEVBQUUsaUJBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQztDQUMvQyxDQUFDLENBQUMifQ==