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
    // webp をサポートさているかどうか確認
    public static async IsWebpSupportedAsync(): Promise<boolean>
    {
        // If the browser doesn't has the method createImageBitmap, you can't display webp format
        if (!self.createImageBitmap) return false;

        // Base64 representation of a white point image
        const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

        // Retrieve the Image in Blob Format
        const blob = await fetch(webpData).then(r => r.blob());

        // If the createImageBitmap method succeeds, return true, otherwise false
        return createImageBitmap(blob).then(() => true, () => false);
    }

    // Web ブラウザの種類を取得
    public static GetBrowserType(): string
    {
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) !== -1)
        {
            return "Opera";
        }
        else if (navigator.userAgent.indexOf("Chrome") !== -1)
        {
            return "Chrome";
        }
        else if (navigator.userAgent.indexOf("Safari") !== -1)
        {
            return "Safari";
        }
        else if (navigator.userAgent.indexOf("Firefox") !== -1)
        {
            return "Firefox";
        }
        // @ts-ignore
        else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true))
        {
            return "IE";
        }
        else
        {
            return "Unknown";
        }
    }

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

    // ページ遷移時の警告の表示 / 非表示の設定
    public static SetPreventPageUnload(set = false): void
    {
        if (set)
        {
            window.onbeforeunload = function (ev: BeforeUnloadEvent): void
            {
                ev.preventDefault();
                ev.returnValue = "Are you sure you want to close this web page?";
            }
        }
        else
        {
            window.onbeforeunload = null;
        }
    }
}

export class GuacAppClipboardData
{
    // From guacamole-client-1.3.0\guacamole\src\main\webapp\app\clipboard\types\ClipboardData.js
    public Type: string;
    public Data: string;

    public constructor()
    {
        this.Type = "text/plain";
        this.Data = "";
    }
}

export class GuacAppClipboardService
{
    // From guacamole-client-1.3.0\guacamole\src\main\webapp\app\clipboard\services\clipboardService.js
    public ClipboardData: GuacAppClipboardData;
    public CLIPBOARD_READ_DELAY = 100;
    public pendingRead: Promise<GuacAppClipboardData> | null = null;
    public window: Window;
    public document: Document;
    public clipboardContent: HTMLTextAreaElement;
    public selectionStack: Range[] = [];

    public constructor(window: Window)
    {
        this.ClipboardData = new GuacAppClipboardData();
        this.window = window;
        this.document = this.window.document;
        this.clipboardContent = this.document.createElement("textarea");
        this.clipboardContent.className = "clipboard-service-target";
        this.document.body.appendChild(this.clipboardContent);

        this.clipboardContent.addEventListener("cut", this.stopEventPropagation);
        this.clipboardContent.addEventListener("copy", this.stopEventPropagation);
        this.clipboardContent.addEventListener("paste", this.stopEventPropagation);
        this.clipboardContent.addEventListener("input", this.stopEventPropagation);
    }

    public stopEventPropagation(e: Event): void
    {
        e.stopPropagation();
    }

    public pushSelection(): void
    {
        const selection = this.window.getSelection();
        if (selection && selection.getRangeAt && selection.rangeCount)
        {
            this.selectionStack.push(selection.getRangeAt(0));
        }
    }

}
