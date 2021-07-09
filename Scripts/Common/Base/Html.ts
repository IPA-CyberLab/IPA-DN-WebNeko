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

import { Dialog } from "../../Imports";
import { Str } from "./Str";
import { Util } from "./Util";

// Author: Daiyuu Nobori
// Html Utility

export class Html
{
    // フルスクリーンに対応しているかどうか
    public static IsFullScreenSupported(): boolean
    {
        return document.fullscreenEnabled;
    }

    // フルスクリーン時の画面サイズを返す
    public static GetFullScreenSize(): [number, number]
    {
        return [Math.max(window.screen.width, 320), Math.max(window.screen.height, 240)];
    }

    // ジャンプ
    public static NativateTo(url: string): void
    {
        location.href = url;
    }

    // フォーカス設定
    public static FocusEx(textBox: HTMLInputElement): void
    {
        textBox.select();
        textBox.focus();
    }

    // メッセージボックス (アラート) の表示
    public static async DialogAlertAsync(message: string, title = "", allowHtml = false, buttonColor = "is-link", icon = "fas fa-info-circle", okButtonText = "OK", bold = false): Promise<void>
    {
        const faIcon = Str.ParseFontAwsomeIconClassStr(icon);

        if (!allowHtml) message = Str.EncodeHtml(message, undefined, true);

        if (bold)
        {
            message = "<strong>" + message + "</strong>";
        }

        const result = await new Promise((resolve, reject) =>
        {
            Dialog.alert(
                {
                    message: message,
                    title: Str.FilledOrUndefined(title),
                    type: buttonColor,
                    canCancel: false,
                    hasIcon: faIcon ? true : false,
                    iconPack: faIcon?.PackName ?? "",
                    icon: faIcon?.IconName ?? "",
                    confirmText: Str.NonNullTrim(okButtonText),

                    onConfirm: () => resolve(true),
                    onCancel: () => reject(true),
                });
        });

    }

    // メッセージボックス (OK / Cancel) の表示
    public static async DialogConfirmAsync(message: string, title = "", allowHtml = false, buttonColor = "is-link", icon = "fas fa-question-circle", defaultOk = false, okButtonText = "OK", cancelButtonText = "Cancel", bold = false): Promise<boolean>
    {
        const faIcon = Str.ParseFontAwsomeIconClassStr(icon);

        if (!allowHtml) message = Str.EncodeHtml(message, undefined, true);

        if (bold)
        {
            message = "<strong>" + message + "</strong>";
        }

        try
        {
            const result = await new Promise((resolve, reject) =>
            {
                Dialog.confirm(
                    {
                        message: message,
                        title: Str.FilledOrUndefined(title),
                        type: buttonColor,
                        hasIcon: faIcon ? true : false,
                        iconPack: faIcon?.PackName ?? "",
                        icon: faIcon?.IconName ?? "",
                        confirmText: Str.NonNullTrim(okButtonText),
                        cancelText: Str.NonNullTrim(cancelButtonText),
                        focusOn: defaultOk ? "confirm" : "cancel",

                        onConfirm: () => resolve(true),
                        onCancel: () => reject(false),
                    });
            });

            return result as boolean;
        }
        catch (ex)
        {
            return false;
        }
    }
}

