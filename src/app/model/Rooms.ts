import {User} from './User';

export class Rooms {

  private _userList: User[];
  private _roomMessages: String[];
  private _OPList: Map<String, User>;
  private _VoiceList: Map<String, User>;

  hasOP(roomName: String): boolean {
    return this._OPList.has(roomName);
  }

  hasVoice(roomName: String): boolean {
    return this._VoiceList.has(roomName);
  }

  get userList(): User[] {
    return this._userList;
  }

  get roomMessages(): String[] {
    return this._roomMessages;
  }

  get OPList(): Map<String, User> {
    return this._OPList;
  }

  get VoiceList(): Map<String, User> {
    return this._VoiceList;
  }
}
