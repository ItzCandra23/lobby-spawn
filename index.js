"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbySpawn = void 0;
const event_1 = require("bdsx/event");
const blockpos_1 = require("bdsx/bds/blockpos");
const actor_1 = require("bdsx/bds/actor");
const launcher_1 = require("bdsx/launcher");
const message_1 = require("./src/utils/message");
const path = require("path");
const fs = require("fs");
const timeout = new Map();
let config = {
    joinspawn: false,
    timeout: 0,
    position: blockpos_1.Vec3.create(0, 0, 0),
};
const configPath = path.join(__dirname, "config.json");
try {
    config = require(configPath);
}
catch (err) { }
var LobbySpawn;
(function (LobbySpawn) {
    function isJoinSpawn() {
        var _a;
        return (_a = config.joinspawn) !== null && _a !== void 0 ? _a : false;
    }
    LobbySpawn.isJoinSpawn = isJoinSpawn;
    function getTimeout() {
        if (!config.timeout)
            return null;
        if (config.timeout < 1)
            return null;
        return config.timeout;
    }
    LobbySpawn.getTimeout = getTimeout;
    function getPosition() {
        return config.position;
    }
    LobbySpawn.getPosition = getPosition;
    function setJoinSpawn(value) {
        config.joinspawn = value;
    }
    LobbySpawn.setJoinSpawn = setJoinSpawn;
    function setTimeout(seaconds) {
        if (seaconds === null) {
            config.timeout = 0;
            return;
        }
        if (seaconds < 1) {
            config.timeout = 0;
            return;
        }
        config.timeout = seaconds;
    }
    LobbySpawn.setTimeout = setTimeout;
    function setPosition(position) {
        const pos = blockpos_1.Vec3.create(position.x, position.y, position.z);
        config.position = pos;
        launcher_1.bedrockServer.level.setDefaultSpawn(blockpos_1.BlockPos.create(config.position));
    }
    LobbySpawn.setPosition = setPosition;
    function spawn(player) {
        const pos = blockpos_1.Vec3.create(LobbySpawn.getPosition()).floor();
        player.teleport(pos, actor_1.DimensionId.Overworld);
    }
    LobbySpawn.spawn = spawn;
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
    }
    LobbySpawn.save = save;
})(LobbySpawn = exports.LobbySpawn || (exports.LobbySpawn = {}));
event_1.events.playerJoin.on((ev) => {
    if (LobbySpawn.isJoinSpawn())
        LobbySpawn.spawn(ev.player);
});
event_1.events.serverOpen.on(() => {
    require("./src/index");
    LobbySpawn.setPosition(launcher_1.bedrockServer.level.getDefaultSpawn());
    message_1.send.success("Started!");
});
event_1.events.serverClose.on(() => {
    LobbySpawn.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0M7QUFFcEMsZ0RBQW1EO0FBRW5ELDBDQUE2QztBQUM3Qyw0Q0FBOEM7QUFDOUMsaURBQTJDO0FBQzNDLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFFekIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7QUFFckQsSUFBSSxNQUFNLEdBSU47SUFDQSxTQUFTLEVBQUUsS0FBSztJQUNoQixPQUFPLEVBQUUsQ0FBQztJQUNWLFFBQVEsRUFBRSxlQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2pDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJO0lBQ0EsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNoQztBQUFDLE9BQU0sR0FBRyxFQUFFLEdBQUU7QUFFZixJQUFpQixVQUFVLENBdUQxQjtBQXZERCxXQUFpQixVQUFVO0lBRXZCLFNBQWdCLFdBQVc7O1FBQ3ZCLE9BQU8sTUFBQSxNQUFNLENBQUMsU0FBUyxtQ0FBSSxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUZlLHNCQUFXLGNBRTFCLENBQUE7SUFFRCxTQUFnQixVQUFVO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2pDLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDcEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFKZSxxQkFBVSxhQUl6QixDQUFBO0lBRUQsU0FBZ0IsV0FBVztRQUN2QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUZl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