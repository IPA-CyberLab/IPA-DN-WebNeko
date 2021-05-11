// IPA WebNeko
// 
// Copyright (c) 2021- IPA CyberLab.
// All Rights Reserved.
// 
// License: The Apache License, Version 2.0
// https://www.apache.org/licenses/LICENSE-2.0
// 
// THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// THIS SOFTWARE IS DEVELOPED IN JAPAN, AND DISTRIBUTED FROM JAPAN, UNDER
// JAPANESE LAWS. YOU MUST AGREE IN ADVANCE TO USE, COPY, MODIFY, MERGE, PUBLISH,
// DISTRIBUTE, SUBLICENSE, AND/OR SELL COPIES OF THIS SOFTWARE, THAT ANY
// JURIDICAL DISPUTES WHICH ARE CONCERNED TO THIS SOFTWARE OR ITS CONTENTS,
// AGAINST US (IPA CYBERLAB, DAIYUU NOBORI, SOFTETHER VPN PROJECT OR OTHER
// SUPPLIERS), OR ANY JURIDICAL DISPUTES AGAINST US WHICH ARE CAUSED BY ANY KIND
// OF USING, COPYING, MODIFYING, MERGING, PUBLISHING, DISTRIBUTING, SUBLICENSING,
// AND/OR SELLING COPIES OF THIS SOFTWARE SHALL BE REGARDED AS BE CONSTRUED AND
// CONTROLLED BY JAPANESE LAWS, AND YOU MUST FURTHER CONSENT TO EXCLUSIVE
// JURISDICTION AND VENUE IN THE COURTS SITTING IN TOKYO, JAPAN. YOU MUST WAIVE
// ALL DEFENSES OF LACK OF PERSONAL JURISDICTION AND FORUM NON CONVENIENS.
// PROCESS MAY BE SERVED ON EITHER PARTY IN THE MANNER AUTHORIZED BY APPLICABLE
// LAW OR COURT RULE.

import Guacamole from "../../../Libraries/guacamole-common-js-1.3.0/guacamole-common";
import { Str } from "../../Common/Base/Str";
import { Task, AsyncLock } from "../../Common/Base/Task";
import { Time } from "../../Common/Base/Time";
import { Util } from "../../Common/Base/Util"

// Author: Daiyuu Nobori
// guacamole-common-js 用の便利ライブラリ

export const GuaConsts =
{
    MaxNumKeys: 0xFFFF + 2,
    InvalidKeycode: 0xFFFF + 1,

    MinWidth: 800,
    MinHeight: 600,
    MaxWidth: 5760,
    MaxHeight: 2400,
};

// Guacamole のステート一覧表
export const GuaStates =
{
    // From: https://github.com/padarom/guacamole-common-js/blob/d19e3e5f051858586bae69184e91381ed4715f8b/guacamole-common-js/src/main/webapp/modules/Client.js#L35
    STATE_IDLE: 0,
    STATE_CONNECTING: 1,
    STATE_WAITING: 2,
    STATE_CONNECTED: 3,
    STATE_DISCONNECTING: 4,
    STATE_DISCONNECTED: 5,
};

// Guacamole のキーコード一覧表
export const GuaKeyCodes =
{
    // From: https://github.com/padarom/guacamole-common-js/blob/d19e3e5f051858586bae69184e91381ed4715f8b/guacamole-common-js/src/main/webapp/modules/Keyboard.js#L480
    Again: 0xFF66,
    AllCandidates: 0xFF3D,
    Alphanumeric: 0xFF30,
    Alt1: 0xFFE9,
    Alt2: 0xFE03,
    Attn: 0xFD0E,
    AltGraph: 0xFE03,
    ArrowDown: 0xFF54,
    ArrowLeft: 0xFF51,
    ArrowRight: 0xFF53,
    ArrowUp: 0xFF52,
    Backspace: 0xFF08,
    CapsLock: 0xFFE5,
    Cancel: 0xFF69,
    Clear: 0xFF0B,
    Convert: 0xFF21,
    Copy: 0xFD15,
    Crsel: 0xFD1C,
    CrSel: 0xFD1C,
    CodeInput: 0xFF37,
    Compose: 0xFF20,
    Control1: 0xFFE3,
    Control2: 0xFFE4,
    ContextMenu: 0xFF67,
    Delete: 0xFFFF,
    Down: 0xFF54,
    End: 0xFF57,
    Enter: 0xFF0D,
    EraseEof: 0xFD06,
    Escape: 0xFF1B,
    Execute: 0xFF62,
    Exsel: 0xFD1D,
    ExSel: 0xFD1D,
    F1: 0xFFBE,
    F2: 0xFFBF,
    F3: 0xFFC0,
    F4: 0xFFC1,
    F5: 0xFFC2,
    F6: 0xFFC3,
    F7: 0xFFC4,
    F8: 0xFFC5,
    F9: 0xFFC6,
    F10: 0xFFC7,
    F11: 0xFFC8,
    F12: 0xFFC9,
    F13: 0xFFCA,
    F14: 0xFFCB,
    F15: 0xFFCC,
    F16: 0xFFCD,
    F17: 0xFFCE,
    F18: 0xFFCF,
    F19: 0xFFD0,
    F20: 0xFFD1,
    F21: 0xFFD2,
    F22: 0xFFD3,
    F23: 0xFFD4,
    F24: 0xFFD5,
    Find: 0xFF68,
    GroupFirst: 0xFE0C,
    GroupLast: 0xFE0E,
    GroupNext: 0xFE08,
    GroupPrevious: 0xFE0A,
    //FullWidth: null,
    //HalfWidth: null,
    HangulMode: 0xFF31,
    Hankaku: 0xFF29,
    HanjaMode: 0xFF34,
    Help: 0xFF6A,
    Hiragana: 0xFF25,
    HiraganaKatakana: 0xFF27,
    Home: 0xFF50,
    //Hyper: 0xFFED, 0xFFED, 0xFFEE,
    Insert: 0xFF63,
    JapaneseHiragana: 0xFF25,
    JapaneseKatakana: 0xFF26,
    JapaneseRomaji: 0xFF24,
    JunjaMode: 0xFF38,
    KanaMode: 0xFF2D,
    KanjiMode: 0xFF21,
    Katakana: 0xFF26,
    Left: 0xFF51,
    Meta1: 0xFFE7,
    Meta2: 0xFFE8,
    ModeChange: 0xFF7E,
    NumLock: 0xFF7F,
    PageDown: 0xFF56,
    PageUp: 0xFF55,
    Pause: 0xFF13,
    Play: 0xFD16,
    PreviousCandidate: 0xFF3E,
    PrintScreen: 0xFF61,
    Redo: 0xFF66,
    Right: 0xFF53,
    //RomanCharacters: null,
    Scroll: 0xFF14,
    Select: 0xFF60,
    Separator: 0xFFAC,
    Shift1: 0xFFE1,
    Shift2: 0xFFE2,
    SingleCandidate: 0xFF3C,
    Super1: 0xFFEB,
    Super2: 0xFFEC,
    Tab: 0xFF09,
    UIKeyInputDownArrow: 0xFF54,
    UIKeyInputEscape: 0xFF1B,
    UIKeyInputLeftArrow: 0xFF51,
    UIKeyInputRightArrow: 0xFF53,
    UIKeyInputUpArrow: 0xFF52,
    Up: 0xFF52,
    Undo: 0xFF65,
    Win: 0xFFEB,
    Zenkaku: 0xFF28,
    ZenkakuHankaku: 0xFF2A,
    Space: 0x20,
}

// 論理キーボード抽象クラス
export abstract class GuaLogicalKeyboard
{
    protected readonly CurrentVirtualKeyStates: boolean[] = [];
    protected readonly CurrentPhysicalKeyStates: boolean[] = [];

    readonly PhysicalLock = new AsyncLock();
    readonly LogicalLock = new AsyncLock();

    public constructor()
    {
        this.CurrentVirtualKeyStates = new Array(GuaConsts.MaxNumKeys);
        this.CurrentVirtualKeyStates.fill(false);

        this.CurrentPhysicalKeyStates = new Array(GuaConsts.MaxNumKeys);
        this.CurrentPhysicalKeyStates.fill(false);
    }

    // 論理的なキーを押すときに呼び出される実装関数
    protected abstract PressVirtualKeyImplAsync(code: number, pressed: boolean): Promise<void>;

    // 物理的なキーが押されたことを論理的なキーを押すことに変換する実装関数
    protected abstract PhysicalToVirtualOperationImplAsync(code: number, pressed: boolean): Promise<boolean>;

    // 論理的なキーを押したいときにこれを呼び出すこと
    protected async PressVirtualKeyAsync(code: number, pressed: boolean): Promise<void>
    {
        await this.LogicalLock.LockAsync(async () =>
        {
            code = GuaLogicalKeyboard.NormalizeKeyCode(code);

            if (pressed && !this.CurrentVirtualKeyStates[code])
            {
                // 押します
                await this.PressVirtualKeyImplAsync(code, true);

                // 状態変化
                this.CurrentVirtualKeyStates[code] = true;
            }
            else if (!pressed && this.CurrentVirtualKeyStates[code])
            {
                // 離します
                await this.PressVirtualKeyImplAsync(code, false);

                // 状態変化
                this.CurrentVirtualKeyStates[code] = false;
            }
        });
    }

    // 物理的なキーが押された時にこれを呼び出すこと
    public async PhysicalKeyPressedAsync(code: number, pressed: boolean): Promise<void>
    {
        await this.PhysicalLock.LockAsync(async () =>
        {
            code = GuaLogicalKeyboard.NormalizeKeyCode(code);

            // 物理的なキーボードから二重押しではない一貫性があるキーボード操作が届いたかどうか
            if ((pressed && !this.CurrentPhysicalKeyStates[code]) ||
                (!pressed && this.CurrentPhysicalKeyStates[code]))
            {
                // 状態更新
                this.CurrentPhysicalKeyStates[code] = pressed;

                // 実装に委ねる
                if (!await this.PhysicalToVirtualOperationImplAsync(code, pressed))
                {
                    // 実装が何もしなかった (false を返した) 場合は、そのまま伝える
                    await this.PressVirtualKeyAsync(code, pressed);
                }
            }
        });
    }

    // キーコードの正規化
    public static NormalizeKeyCode(code: number): number
    {
        let ret = Util.ToInt(code);
        if (ret < 0) ret = GuaConsts.InvalidKeycode;
        if (ret > GuaConsts.InvalidKeycode) ret = GuaConsts.InvalidKeycode;
        return ret;
    }
}

// Guacamole Client に関連付けられた論理キーボード
export class GuaConnectedKeyboard extends GuaLogicalKeyboard
{
    public readonly Client: Guacamole.Client;
    public readonly Profile: any;

    public readonly SvcType: string;
    public readonly IsRdp: boolean;
    public readonly IsVnc: boolean;

    public readonly IsDebug: boolean;

    public constructor(client: Guacamole.Client, profile: any, svcType: string)
    {
        super();

        this.Client = client;

        this.Profile = profile;
        this.SvcType = svcType;

        this.IsRdp = Str.IsSamei(this.SvcType, "rdp");
        this.IsVnc = !this.IsRdp;

        this.IsDebug = this.Profile.Preference.EnableDebug;

        if (this.IsDebug)
        {
            Util.Debug(`GuaConnectedKeyboard: SvcType = ${this.SvcType}`);
            Util.Debug(`GuaConnectedKeyboard: IsRdp = ${this.IsRdp}`);
            Util.Debug(`GuaConnectedKeyboard: IsVnc = ${this.IsVnc}`);
        }
    }

    protected async PressVirtualKeyImplAsync(code: number, pressed: boolean): Promise<void>
    {
        if (this.IsDebug)
        {
            const keyCodeString = GuaUtil.KeyCodeToStr(code);

            const tmp = `${keyCodeString} (${Str.To0xHex(code)}): ${pressed ? "Down" : "Up"}`;

            Util.Debug(tmp);
        }

        this.Client.sendKeyEvent(pressed, code);
    }

    protected async PhysicalToVirtualOperationImplAsync(code: number, pressed: boolean): Promise<boolean>
    {
        // 何もしない
        return false;
    }
}

// 使いやすいキーボード
export class GuaComfortableKeyboard extends GuaLogicalKeyboard
{
    public readonly Physical: GuaLogicalKeyboard;
    public readonly Profile: any;
    public readonly SvcType: string;
    public readonly IsRdp: boolean;
    public readonly IsVnc: boolean;
    public readonly IsDebug: boolean;

    Win_LastState_Shift1 = false;
    Win_LastState_Shift2 = false;
    Win_InState = false;

    Win_Ctrl2Alt2_InState = false;

    public constructor(physical: GuaLogicalKeyboard, profile: any, svcType: string)
    {
        super();

        this.Physical = physical;

        this.Profile = profile;
        this.SvcType = svcType;

        this.IsRdp = Str.IsSamei(this.SvcType, "rdp");
        this.IsVnc = !this.IsRdp;

        this.IsDebug = this.Profile.Preference.EnableDebug;

        if (this.IsDebug)
        {
            Util.Debug(`GuaComfortableKeyboard: SvcType = ${this.SvcType}`);
            Util.Debug(`GuaComfortableKeyboard: IsRdp = ${this.IsRdp}`);
            Util.Debug(`GuaComfortableKeyboard: IsVnc = ${this.IsVnc}`);
        }
    }

    protected async PressVirtualKeyImplAsync(code: number, pressed: boolean): Promise<void>
    {
        await this.Physical.PhysicalKeyPressedAsync(code, pressed);
    }

    protected async PhysicalToVirtualOperationImplAsync(code: number, pressed: boolean): Promise<boolean>
    {
        const pref = this.Profile.Preference;

        // Chrome 対応: "Meta" キーが押されたら、Windows キーが押されたものと置換する
        if (code === GuaKeyCodes.Meta1 || code === GuaKeyCodes.Meta2)
        {
            code = GuaKeyCodes.Win;
        }

        // Windows キーに関する特殊な動作
        if (pref.Win_ShiftWin && code === GuaKeyCodes.Win)
        {
            if (pressed)
            {
                // Windows キーが押された
                const shift1: boolean = this.CurrentVirtualKeyStates[GuaKeyCodes.Shift1];
                const shift2: boolean = this.CurrentVirtualKeyStates[GuaKeyCodes.Shift2];
                if (shift1 || shift2)
                {
                    // 物理的に Shift キーが押されている
                    // 一旦 Shift キーを離し、Windows キーを押す
                    if (shift1) await this.PressVirtualKeyAsync(GuaKeyCodes.Shift1, false);
                    if (shift2) await this.PressVirtualKeyAsync(GuaKeyCodes.Shift2, false);

                    await Task.Delay(100);

                    await this.PressVirtualKeyAsync(GuaKeyCodes.Win, true);

                    // 元々の Shift キーの状態を覚えておく
                    this.Win_LastState_Shift1 = shift1;
                    this.Win_LastState_Shift2 = shift2;

                    this.Win_InState = true;
                }
            }
            else
            {
                // Windows キーが離された
                await this.PressVirtualKeyAsync(GuaKeyCodes.Win, false);

                await Task.Delay(100);

                // もともと Shift キーが押されていたならば、再度押し直す
                if (this.Win_LastState_Shift1) await this.PressVirtualKeyAsync(GuaKeyCodes.Shift1, true);
                if (this.Win_LastState_Shift2) await this.PressVirtualKeyAsync(GuaKeyCodes.Shift2, true);

                this.Win_InState = false;
            }

            return true;
        }
        else if (pref.Win_ShiftWin && this.Win_InState)
        {
            // Windows キーが押されたときに、a ～ z, A ～ Z のキーが新たに押された場合は、チョン！という形で一瞬そのキーを押してすぐに離す
            if (code >= Str.CharToAscii("A") && code <= Str.CharToAscii("Z"))
            {
                // 大文字コードは小文字に変換する
                code += 0x20;
            }

            if (code >= Str.CharToAscii("a") && code <= Str.CharToAscii("z") && pressed)
            {
                if (!this.CurrentVirtualKeyStates[code])
                {
                    await this.PressVirtualKeyAsync(code, true);

                    await Task.Delay(100);

                    await this.PressVirtualKeyAsync(code, false);

                    return true;
                }
            }
        }
        else if (pref.Win_Ctrl2Alt2 &&
            !this.Win_Ctrl2Alt2_InState &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Control2] &&
            code === GuaKeyCodes.Alt2 && pressed)
        {
            // 既に 右 Ctrl が押されている状態で右 Alt が押された場合は、Windows キーが押されたものとみなす

            // まず右 Ctrl を離したことにする
            await this.PressVirtualKeyAsync(GuaKeyCodes.Control2, false);

            // Windows を押したことにする
            await this.PressVirtualKeyAsync(GuaKeyCodes.Win, true);

            // Win_Ctrl2Alt2_InState フラグを立てる
            this.Win_Ctrl2Alt2_InState = true;

            // 右 Alt は押されなかったことにする
            return true;
        }
        else if (pref.Win_Ctrl2Alt2 &&
            this.Win_Ctrl2Alt2_InState &&
            code === GuaKeyCodes.Alt2 && !pressed)
        {
            // Win_Ctrl2Alt2_InState フラグが有効なとき、右 Alt が離されたときは Windows を離し、かつフラグを解除する

            await this.PressVirtualKeyAsync(GuaKeyCodes.Win, false);

            this.Win_Ctrl2Alt2_InState = false;

            // 右 Alt は操作されていないことにする
            return true;
        }
        else if (pref.Cad_CtrlAltEnd &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Control1] &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Alt1] &&
            code === GuaKeyCodes.End &&
            pressed)
        {
            // 既に Ctrl + Alt が押されている状態で End が押された場合、Delete を押してすぐに離すことで、Ctrl + Alt + Delete が押されたようにホストに見せかける
            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, true);

            await Task.Delay(300);

            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, false);

            return true;
        }
        else if (pref.Cad_CtrlAltHome &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Control1] &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Alt1] &&
            code === GuaKeyCodes.Home &&
            pressed)
        {
            // 既に Ctrl + Alt が押されている状態で Home が押された場合、Delete を押してすぐに離すことで、Ctrl + Alt + Delete が押されたようにホストに見せかける
            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, true);

            await Task.Delay(300);

            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, false);

            return true;
        }
        else if (pref.Cad_CtrlAltBackspace &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Control1] &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Alt1] &&
            code === GuaKeyCodes.Backspace &&
            pressed)
        {
            // 既に Ctrl + Alt が押されている状態で Backspace が押された場合、Delete を押してすぐに離すことで、Ctrl + Alt + Delete が押されたようにホストに見せかける
            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, true);

            await Task.Delay(300);

            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, false);

            return true;
        }
        else if (pref.Cad_CtrlShiftBackspace &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Control1] &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Shift1] &&
            code === GuaKeyCodes.Backspace &&
            pressed)
        {
            // 既に Ctrl + Shift が押されている状態で Backspace が押された場合、まず Shift を離し、次に Alt + Delete を押して、すぐに離し、また Shift を押すのである。
            await this.PressVirtualKeyAsync(GuaKeyCodes.Shift1, false);
            await Task.Delay(100);
            await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, true);

            await Task.Delay(300);

            await this.PressVirtualKeyAsync(GuaKeyCodes.Delete, false);
            await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            await Task.Delay(100);
            await this.PressVirtualKeyAsync(GuaKeyCodes.Shift1, true);

            return true;
        }
        else if (pref.Tab_AltShift &&
            (this.CurrentPhysicalKeyStates[GuaKeyCodes.Alt1]) &&
            code === GuaKeyCodes.Shift1 &&
            pressed)
        {
            // 既に Alt が押されている状態で Shift が押された場合、Shift の代わりに Tab を押すのである。
            await this.PressVirtualKeyAsync(GuaKeyCodes.Tab, true);

            await Task.Delay(300);

            await this.PressVirtualKeyAsync(GuaKeyCodes.Tab, false);

            return true;
        }
        else if (pref.Ime_LeftCtrlSpace &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Control1] && code === GuaKeyCodes.Space && pressed)
        {
            // IME の ON/OFF の切替え ホットキー その 1: 左 Ctrl + Space
            await this.PressVirtualKeyAsync(GuaKeyCodes.Control1, false);

            if (this.IsRdp || Str.IsSamei(this.Profile.Preference.KeyboardLayoutStr, "en-us-qwerty"))
            {
                // システムモード または 英語キーボード
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
                await this.PressVirtualKeyAsync(0x60, true);

                await Task.Delay(100);

                await this.PressVirtualKeyAsync(0x60, false);
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            }
            else
            {
                // ユーザーモード かつ 日本語キーボード
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
                await this.PressVirtualKeyAsync(GuaKeyCodes.ZenkakuHankaku, true);

                await Task.Delay(100);

                await this.PressVirtualKeyAsync(GuaKeyCodes.ZenkakuHankaku, false);
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            }

            return true;
        }
        else if (pref.Ime_LeftShiftSpace &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Shift1] && code === GuaKeyCodes.Space && pressed)
        {
            // IME の ON/OFF の切替え ホットキー その 2: 左 Shift + Space
            await this.PressVirtualKeyAsync(GuaKeyCodes.Shift1, false);

            if (this.IsRdp || Str.IsSamei(this.Profile.Preference.KeyboardLayoutStr, "en-us-qwerty"))
            {
                // システムモード または 英語キーボード
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
                await this.PressVirtualKeyAsync(0x60, true);

                await Task.Delay(100);

                await this.PressVirtualKeyAsync(0x60, false);
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            }
            else
            {
                // ユーザーモード かつ 日本語キーボード
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
                await this.PressVirtualKeyAsync(GuaKeyCodes.ZenkakuHankaku, true);

                await Task.Delay(100);

                await this.PressVirtualKeyAsync(GuaKeyCodes.ZenkakuHankaku, false);
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            }

            return true;
        }
        else if (pref.Ime_OptionSpace &&
            this.CurrentPhysicalKeyStates[GuaKeyCodes.Alt1] && code === 0xA0 && pressed)
        {
            // IME の ON/OFF の切替え ホットキー その 3: Mac における左 Option + Space
            await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);

            if (this.IsRdp || Str.IsSamei(this.Profile.Preference.KeyboardLayoutStr, "en-us-qwerty"))
            {
                // システムモード または 英語キーボード
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
                await this.PressVirtualKeyAsync(0x60, true);

                await Task.Delay(100);

                await this.PressVirtualKeyAsync(0x60, false);
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            }
            else
            {
                // ユーザーモード かつ 日本語キーボード
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, true);
                await this.PressVirtualKeyAsync(GuaKeyCodes.ZenkakuHankaku, true);

                await Task.Delay(100);

                await this.PressVirtualKeyAsync(GuaKeyCodes.ZenkakuHankaku, false);
                await this.PressVirtualKeyAsync(GuaKeyCodes.Alt1, false);
            }

            return true;
        }

        return false;
    }
}

export class GuaUtil
{
    // キーコードの値をわかりやすい文字列に変形
    public static KeyCodeToStr(code: number): string
    {
        code = Util.ToInt(code);

        for (const item of Object.entries(GuaKeyCodes))
        {
            if (item[1] !== null)
            {
                if (item[1] === code)
                {
                    return item[0];
                }
            }
        }

        return Str.To0xHex(code);
    }
}

// Guac に対してサイズ変更命令を送付する関数。ただし最大で 1 秒に 1 回しか送付しない
export class GuaResizeManager
{
    private readonly Guac: Guacamole.Client;

    public static readonly DefaultInitialInterval = 100;
    public static readonly DefaultMaxInterval = 100;

    private InitialInterval: number;
    private MaxInterval: number;
    private IntervalTimes = 0;

    private NextWidth: number;
    private NextHeight: number;

    private GuacLastWidth: number;
    private GuacLastHeight: number;

    constructor(guac: Guacamole.Client, initialWidth: number, initialHeight: number, initialInterval = GuaResizeManager.DefaultInitialInterval, maxInterval = GuaResizeManager.DefaultMaxInterval)
    {
        initialWidth = Math.min(Math.max(initialWidth, GuaConsts.MinWidth), GuaConsts.MaxWidth);
        initialHeight = Math.min(Math.max(initialHeight, GuaConsts.MinHeight), GuaConsts.MaxHeight);

        initialInterval = Math.max(initialInterval, 1000);
        maxInterval = Math.max(maxInterval, 1000);

        this.InitialInterval = initialInterval;
        this.MaxInterval = maxInterval;

        this.Guac = guac;

        this.NextWidth = initialWidth;
        this.NextHeight = initialHeight;

        this.GuacLastWidth = guac.getDisplay().getWidth();
        this.GuacLastHeight = guac.getDisplay().getHeight();

        this.ResizeNowCore(this.NextWidth, this.NextHeight);
    }

    private IsLazyResizeProcessing = false;

    private async LazyResizeAsync(): Promise<void>
    {
        try
        {
            this.IntervalTimes++;

            const interval = Math.min(this.InitialInterval * this.IntervalTimes, this.MaxInterval);

            await Task.Delay(interval);

            this.ResizeNowCore(this.NextWidth, this.NextHeight);
        }
        catch { }

        this.IsLazyResizeProcessing = false;
    }

    private LastResizeRequestedTick = 0;

    // リサイズ要求
    public Resize(width: number, height: number): void
    {
        const now = Time.Tick64;

        width = Math.min(Math.max(width, GuaConsts.MinWidth), GuaConsts.MaxWidth);
        height = Math.min(Math.max(height, GuaConsts.MinHeight), GuaConsts.MaxHeight);

        if (this.NextWidth !== width || this.NextHeight !== height)
        {
            this.NextWidth = width;
            this.NextHeight = height;

            if (this.LastResizeRequestedTick === 0 || now >= (this.LastResizeRequestedTick + this.InitialInterval * this.IntervalTimes))
            {
                this.IntervalTimes = 0;
            }
            this.LastResizeRequestedTick = now;

            if (!this.IsLazyResizeProcessing)
            {
                this.IsLazyResizeProcessing = true;

                this.ResizeNowCore(this.NextWidth, this.NextHeight);

                Task.StartAsyncTaskAsync(
                    this.LazyResizeAsync()
                );
            }
        }
    }

    // リサイズの実行の内部処理 (変更があった場合のみ)
    private ResizeNowCore(width: number, height: number): boolean
    {
        width = Math.min(Math.max(width, GuaConsts.MinWidth), GuaConsts.MaxWidth);
        height = Math.min(Math.max(height, GuaConsts.MinHeight), GuaConsts.MaxHeight);

        // 変化があった場合のみリサイズを実行する
        if (this.GuacLastWidth !== width || this.GuacLastHeight !== height)
        {
            this.Guac.sendSize(width, height);

            this.GuacLastWidth = width;
            this.GuacLastHeight = height;

            return true;
        }

        return false;
    }
}


