import SteamUser from "steam-user";
import { FriendStatus } from "../enums/fiendStatus";
import GlobalOffensive from "globaloffensive";
import SteamID from "steamid";
import { getEnv } from "../utils/getEnv";
class SteamService {
  private user = new SteamUser({ autoRelogin: true });
  private csgo = new GlobalOffensive(this.user);
  logIn = () => {
    return new Promise<void>((resolve) => {
      this.user.logOn({
        accountName: getEnv("STEAM_USERNAME"),
        password: getEnv("STEAM_PASSWORD"),
      });
      this.user.on("loggedOn", () => {
        resolve();
      });
    });
  };
  setGameCsGo = () => {
    return new Promise<void>((resolve) => {
      this.user.gamesPlayed(730, true);
      resolve();
    });
  };
  private addFriends = (steamId: string) => {
    return new Promise<void>((resolve) => {
      this.user.addFriend(steamId);
      resolve();
    });
  };
  thisUser = () => {
    console.log(this.user);
  };
  private steam64IdToSteam32 = (id64: string) => {
    const sid = new SteamID(id64);
    const splittedId = sid
      .getSteam3RenderedID()
      .replace(/\[|\]/g, "")
      .split(":");
    const playerId = splittedId[splittedId.length - 1];
    return playerId;
  };
  private requestGameStatKills = (steamId: string, matchCode: string) => {
    return new Promise<number>((resolve) => {
      this.csgo.requestGame(matchCode);
      this.csgo.on("matchList", (list) => {
        const allRounds = list[0].roundstatsall;
        const userPos = allRounds[
          allRounds.length - 1
        ].reservation.account_ids.indexOf(+steamId);
        const playerKills = allRounds[allRounds.length - 1].kills[userPos];
        resolve(playerKills);
      });
    });
  };
  private removeListeners = () => {
    return new Promise<void>((resolve) => {
      this.csgo.removeAllListeners();
      resolve();
    });
  };
  checkFriendRequest = async (steamId: string) => {
    const userFriends = this.user.myFriends;
    const friend = userFriends[steamId];
    if (!friend) {
      return false;
    }
    if ((friend as number) === FriendStatus.Friends) {
      return true;
    }
    if ((friend as number) === FriendStatus.ActiveRequest) {
      await this.addFriends(steamId);
      return true;
    }
    return false;
  };
  getPlayerStatKills = async (steamId: string, matchCode: string) => {
    const steamId32 = this.steam64IdToSteam32(steamId);
    const kills = await this.requestGameStatKills(steamId32, matchCode);
    await this.removeListeners();
    return kills;
  };
}

export const steamService = new SteamService();
