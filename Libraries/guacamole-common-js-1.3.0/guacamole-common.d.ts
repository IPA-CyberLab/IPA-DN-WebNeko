//declare module 'guacamole-common' {
/**
 * The namespace used by the Guacamole JavaScript API. Absolutely all classes
defined by the Guacamole JavaScript API will be within this namespace.
 */

export default Guacamole;

export namespace Guacamole {
    /**
     * A reader which automatically handles the given input stream, returning
    strictly received packets as array buffers. Note that this object will
    overwrite any installed event handlers on the given Guacamole.InputStream.
     * @param stream - The stream that data will be read
                                          from.
     */
    class ArrayBufferReader {
        constructor(stream: Guacamole.InputStream);
    }
    /**
     * A writer which automatically writes to the given output stream with arbitrary
    binary data, supplied as ArrayBuffers.
     * @param stream - The stream that data will be written
                                           to.
     */
    class ArrayBufferWriter {
        constructor(stream: Guacamole.OutputStream);
        /**
         * The maximum length of any blob sent by this Guacamole.ArrayBufferWriter,
        in bytes. Data sent via
        [sendData()]{@link Guacamole.ArrayBufferWriter#sendData} which exceeds
        this length will be split into multiple blobs. As the Guacamole protocol
        limits the maximum size of any instruction or instruction element to
        8192 bytes, and the contents of blobs will be base64-encoded, this value
        should only be increased with extreme caution.
         */
        blobLength: number;
        /**
         * Sends the given data.
         * @param data - The data to send.
         */
        sendData(data: ArrayBuffer | ArrayBuffer): void;
        /**
         * Signals that no further text will be sent, effectively closing the
        stream.
         */
        sendEnd(): void;
        /**
         * The default maximum blob length for new Guacamole.ArrayBufferWriter
        instances.
         */
        static readonly DEFAULT_BLOB_LENGTH: number;
    }
    /**
     * Maintains a singleton instance of the Web Audio API AudioContext class,
    instantiating the AudioContext only in response to the first call to
    getAudioContext(), and only if no existing AudioContext instance has been
    provided via the singleton property. Subsequent calls to getAudioContext()
    will return the same instance.
     */
    namespace AudioContextFactory {
        /**
         * A singleton instance of a Web Audio API AudioContext object, or null if
        no instance has yes been created. This property may be manually set if
        you wish to supply your own AudioContext instance, but care must be
        taken to do so as early as possible. Assignments to this property will
        not retroactively affect the value returned by previous calls to
        getAudioContext().
         */
        var singleton: AudioContext;
        /**
         * Returns a singleton instance of a Web Audio API AudioContext object.
         * @returns A singleton instance of a Web Audio API AudioContext object, or null
            if the Web Audio API is not supported.
         */
        function getAudioContext(): AudioContext;
    }
    /**
     * Abstract audio player which accepts, queues and plays back arbitrary audio
    data. It is up to implementations of this class to provide some means of
    handling a provided Guacamole.InputStream. Data received along the provided
    stream is to be played back immediately.
     */
    class AudioPlayer {
        /**
         * Notifies this Guacamole.AudioPlayer that all audio up to the current
        point in time has been given via the underlying stream, and that any
        difference in time between queued audio data and the current time can be
        considered latency.
         */
        sync(): void;
        /**
         * Determines whether the given mimetype is supported by any built-in
        implementation of Guacamole.AudioPlayer, and thus will be properly handled
        by Guacamole.AudioPlayer.getInstance().
         * @param mimetype - The mimetype to check.
         * @returns true if the given mimetype is supported by any built-in
            Guacamole.AudioPlayer, false otherwise.
         */
        static isSupportedType(mimetype: string): boolean;
        /**
         * Returns a list of all mimetypes supported by any built-in
        Guacamole.AudioPlayer, in rough order of priority. Beware that only the core
        mimetypes themselves will be listed. Any mimetype parameters, even required
        ones, will not be included in the list. For example, "audio/L8" is a
        supported raw audio mimetype that is supported, but it is invalid without
        additional parameters. Something like "audio/L8;rate=44100" would be valid,
        however (see https://tools.ietf.org/html/rfc4856).
         * @returns A list of all mimetypes supported by any built-in Guacamole.AudioPlayer,
            excluding any parameters.
         */
        static getSupportedTypes(): String[];
        /**
         * Returns an instance of Guacamole.AudioPlayer providing support for the given
        audio format. If support for the given audio format is not available, null
        is returned.
         * @param stream - The Guacamole.InputStream to read audio data from.
         * @param mimetype - The mimetype of the audio data in the provided stream.
         * @returns A Guacamole.AudioPlayer instance supporting the given mimetype and
            reading from the given stream, or null if support for the given mimetype
            is absent.
         */
        static getInstance(stream: Guacamole.InputStream, mimetype: string): Guacamole.AudioPlayer;
    }
    /**
     * Implementation of Guacamole.AudioPlayer providing support for raw PCM format
    audio. This player relies only on the Web Audio API and does not require any
    browser-level support for its audio formats.
     * @param stream - The Guacamole.InputStream to read audio data from.
     * @param mimetype - The mimetype of the audio data in the provided stream, which must be a
        "audio/L8" or "audio/L16" mimetype with necessary parameters, such as:
        "audio/L16;rate=44100,channels=2".
     */
    class RawAudioPlayer extends Guacamole.AudioPlayer {
        constructor(stream: Guacamole.InputStream, mimetype: string);
        /**
         * Determines whether the given mimetype is supported by
        Guacamole.RawAudioPlayer.
         * @param mimetype - The mimetype to check.
         * @returns true if the given mimetype is supported by Guacamole.RawAudioPlayer,
            false otherwise.
         */
        static isSupportedType(mimetype: string): boolean;
        /**
         * Returns a list of all mimetypes supported by Guacamole.RawAudioPlayer. Only
        the core mimetypes themselves will be listed. Any mimetype parameters, even
        required ones, will not be included in the list. For example, "audio/L8" is
        a raw audio mimetype that may be supported, but it is invalid without
        additional parameters. Something like "audio/L8;rate=44100" would be valid,
        however (see https://tools.ietf.org/html/rfc4856).
         * @returns A list of all mimetypes supported by Guacamole.RawAudioPlayer, excluding
            any parameters. If the necessary JavaScript APIs for playing raw audio
            are absent, this list will be empty.
         */
        static getSupportedTypes(): String[];
        /**
         * Notifies this Guacamole.AudioPlayer that all audio up to the current
        point in time has been given via the underlying stream, and that any
        difference in time between queued audio data and the current time can be
        considered latency.
         */
        sync(): void;
    }
    /**
     * Abstract audio recorder which streams arbitrary audio data to an underlying
    Guacamole.OutputStream. It is up to implementations of this class to provide
    some means of handling this Guacamole.OutputStream. Data produced by the
    recorder is to be sent along the provided stream immediately.
     */
    class AudioRecorder {
        /**
         * Determines whether the given mimetype is supported by any built-in
        implementation of Guacamole.AudioRecorder, and thus will be properly handled
        by Guacamole.AudioRecorder.getInstance().
         * @param mimetype - The mimetype to check.
         * @returns true if the given mimetype is supported by any built-in
            Guacamole.AudioRecorder, false otherwise.
         */
        static isSupportedType(mimetype: string): boolean;
        /**
         * Returns a list of all mimetypes supported by any built-in
        Guacamole.AudioRecorder, in rough order of priority. Beware that only the
        core mimetypes themselves will be listed. Any mimetype parameters, even
        required ones, will not be included in the list. For example, "audio/L8" is
        a supported raw audio mimetype that is supported, but it is invalid without
        additional parameters. Something like "audio/L8;rate=44100" would be valid,
        however (see https://tools.ietf.org/html/rfc4856).
         * @returns A list of all mimetypes supported by any built-in
            Guacamole.AudioRecorder, excluding any parameters.
         */
        static getSupportedTypes(): String[];
        /**
         * Returns an instance of Guacamole.AudioRecorder providing support for the
        given audio format. If support for the given audio format is not available,
        null is returned.
         * @param stream - The Guacamole.OutputStream to send audio data through.
         * @param mimetype - The mimetype of the audio data to be sent along the provided stream.
         * @returns A Guacamole.AudioRecorder instance supporting the given mimetype and
            writing to the given stream, or null if support for the given mimetype
            is absent.
         */
        static getInstance(stream: Guacamole.OutputStream, mimetype: string): Guacamole.AudioRecorder;
    }
    /**
     * Implementation of Guacamole.AudioRecorder providing support for raw PCM
    format audio. This recorder relies only on the Web Audio API and does not
    require any browser-level support for its audio formats.
     * @param stream - The Guacamole.OutputStream to write audio data to.
     * @param mimetype - The mimetype of the audio data to send along the provided stream, which
        must be a "audio/L8" or "audio/L16" mimetype with necessary parameters,
        such as: "audio/L16;rate=44100,channels=2".
     */
    class RawAudioRecorder extends Guacamole.AudioRecorder {
        constructor(stream: Guacamole.OutputStream, mimetype: string);
        /**
         * The audio stream provided by the browser, if allowed. If no stream has
        yet been received, this will be null.
         */
        mediaStream: MediaStream;
        /**
         * Determines whether the given mimetype is supported by
        Guacamole.RawAudioRecorder.
         * @param mimetype - The mimetype to check.
         * @returns true if the given mimetype is supported by Guacamole.RawAudioRecorder,
            false otherwise.
         */
        static isSupportedType(mimetype: string): boolean;
        /**
         * Returns a list of all mimetypes supported by Guacamole.RawAudioRecorder. Only
        the core mimetypes themselves will be listed. Any mimetype parameters, even
        required ones, will not be included in the list. For example, "audio/L8" is
        a raw audio mimetype that may be supported, but it is invalid without
        additional parameters. Something like "audio/L8;rate=44100" would be valid,
        however (see https://tools.ietf.org/html/rfc4856).
         * @returns A list of all mimetypes supported by Guacamole.RawAudioRecorder,
            excluding any parameters. If the necessary JavaScript APIs for recording
            raw audio are absent, this list will be empty.
         */
        static getSupportedTypes(): String[];
    }
    /**
     * A reader which automatically handles the given input stream, assembling all
    received blobs into a single blob by appending them to each other in order.
    Note that this object will overwrite any installed event handlers on the
    given Guacamole.InputStream.
     * @param stream - The stream that data will be read
                                          from.
     * @param mimetype - The mimetype of the blob being built.
     */
    class BlobReader {
        constructor(stream: Guacamole.InputStream, mimetype: string);
        /**
         * Returns the current length of this Guacamole.InputStream, in bytes.
         * @returns The current length of this Guacamole.InputStream.
         */
        getLength(): number;
        /**
         * Returns the contents of this Guacamole.BlobReader as a Blob.
         * @returns The contents of this Guacamole.BlobReader.
         */
        getBlob(): Blob;
    }
    /**
     * A writer which automatically writes to the given output stream with the
    contents of provided Blob objects.
     * @param stream - The stream that data will be written to.
     */
    class BlobWriter {
        constructor(stream: Guacamole.OutputStream);
        /**
         * Sends the contents of the given blob over the underlying stream.
         * @param blob - The blob to send.
         */
        sendBlob(blob: Blob): void;
        /**
         * Signals that no further text will be sent, effectively closing the
        stream.
         */
        sendEnd(): void;
    }
    /**
     * Guacamole protocol client. Given a {@link Guacamole.Tunnel},
    automatically handles incoming and outgoing Guacamole instructions via the
    provided tunnel, updating its display using one or more canvas elements.
     * @param tunnel - The tunnel to use to send and receive
                                     Guacamole instructions.
     */
    class Client {
        constructor(tunnel: Guacamole.Tunnel);
        /**
         * Produces an opaque representation of Guacamole.Client state which can be
        later imported through a call to importState(). This object is
        effectively an independent, compressed snapshot of protocol and display
        state. Invoking this function implicitly flushes the display.
         * @param callback - Callback which should be invoked once the state object is ready. The
            state object will be passed to the callback as the sole parameter.
            This callback may be invoked immediately, or later as the display
            finishes rendering and becomes ready.
         */
        exportState(callback: (...params: any[]) => any): void;
        /**
         * Restores Guacamole.Client protocol and display state based on an opaque
        object from a prior call to exportState(). The Guacamole.Client instance
        used to export that state need not be the same as this instance.
         * @param state - An opaque representation of Guacamole.Client state from a prior call
            to exportState().
         * @param [callback] - The function to invoke when state has finished being imported. This
            may happen immediately, or later as images within the provided state
            object are loaded.
         */
        importState(state: any, callback?: (...params: any[]) => any): void;
        /**
         * Returns the underlying display of this Guacamole.Client. The display
        contains an Element which can be added to the DOM, causing the
        display to become visible.
         * @returns The underlying display of this
                                    Guacamole.Client.
         */
        getDisplay(): Guacamole.Display;
        /**
         * Sends the current size of the screen.
         * @param width - The width of the screen.
         * @param height - The height of the screen.
         */
        sendSize(width: number, height: number): void;
        /**
         * Sends a key event having the given properties as if the user
        pressed or released a key.
         * @param pressed - Whether the key is pressed (true) or released
                                 (false).
         * @param keysym - The keysym of the key being pressed or released.
         */
        sendKeyEvent(pressed: boolean, keysym: number): void;
        /**
         * Sends a mouse event having the properties provided by the given mouse
        state.
         * @param mouseState - The state of the mouse to send
                                                  in the mouse event.
         */
        sendMouseState(mouseState: Guacamole.Mouse.State): void;
        /**
         * Allocates an available stream index and creates a new
        Guacamole.OutputStream using that index, associating the resulting
        stream with this Guacamole.Client. Note that this stream will not yet
        exist as far as the other end of the Guacamole connection is concerned.
        Streams exist within the Guacamole protocol only when referenced by an
        instruction which creates the stream, such as a "clipboard", "file", or
        "pipe" instruction.
         * @returns A new Guacamole.OutputStream with a newly-allocated index and
            associated with this Guacamole.Client.
         */
        createOutputStream(): Guacamole.OutputStream;
        /**
         * Opens a new audio stream for writing, where audio data having the give
        mimetype will be sent along the returned stream. The instruction
        necessary to create this stream will automatically be sent.
         * @param mimetype - The mimetype of the audio data that will be sent along the returned
            stream.
         * @returns The created audio stream.
         */
        createAudioStream(mimetype: string): Guacamole.OutputStream;
        /**
         * Opens a new file for writing, having the given index, mimetype and
        filename. The instruction necessary to create this stream will
        automatically be sent.
         * @param mimetype - The mimetype of the file being sent.
         * @param filename - The filename of the file being sent.
         * @returns The created file stream.
         */
        createFileStream(mimetype: string, filename: string): Guacamole.OutputStream;
        /**
         * Opens a new pipe for writing, having the given name and mimetype. The
        instruction necessary to create this stream will automatically be sent.
         * @param mimetype - The mimetype of the data being sent.
         * @param name - The name of the pipe.
         * @returns The created file stream.
         */
        createPipeStream(mimetype: string, name: string): Guacamole.OutputStream;
        /**
         * Opens a new clipboard object for writing, having the given mimetype. The
        instruction necessary to create this stream will automatically be sent.
         * @param mimetype - The mimetype of the data being sent.
         * @param name - The name of the pipe.
         * @returns The created file stream.
         */
        createClipboardStream(mimetype: string, name: string): Guacamole.OutputStream;
        /**
         * Opens a new argument value stream for writing, having the given
        parameter name and mimetype, requesting that the connection parameter
        with the given name be updated to the value described by the contents
        of the following stream. The instruction necessary to create this stream
        will automatically be sent.
         * @param mimetype - The mimetype of the data being sent.
         * @param name - The name of the connection parameter to attempt to update.
         * @returns The created argument value stream.
         */
        createArgumentValueStream(mimetype: string, name: string): Guacamole.OutputStream;
        /**
         * Creates a new output stream associated with the given object and having
        the given mimetype and name. The legality of a mimetype and name is
        dictated by the object itself. The instruction necessary to create this
        stream will automatically be sent.
         * @param index - The index of the object for which the output stream is being
            created.
         * @param mimetype - The mimetype of the data which will be sent to the output stream.
         * @param name - The defined name of an output stream within the given object.
         * @returns An output stream which will write blobs to the named output stream
            of the given object.
         */
        createObjectOutputStream(index: number, mimetype: string, name: string): Guacamole.OutputStream;
        /**
         * Requests read access to the input stream having the given name. If
        successful, a new input stream will be created.
         * @param index - The index of the object from which the input stream is being
            requested.
         * @param name - The name of the input stream to request.
         */
        requestObjectInputStream(index: number, name: string): void;
        /**
         * Acknowledge receipt of a blob on the stream with the given index.
         * @param index - The index of the stream associated with the
                              received blob.
         * @param message - A human-readable message describing the error
                                or status.
         * @param code - The error code, if any, or 0 for success.
         */
        sendAck(index: number, message: string, code: number): void;
        /**
         * Given the index of a file, writes a blob of data to that file.
         * @param index - The index of the file to write to.
         * @param data - Base64-encoded data to write to the file.
         */
        sendBlob(index: number, data: string): void;
        /**
         * Marks a currently-open stream as complete. The other end of the
        Guacamole connection will be notified via an "end" instruction that the
        stream is closed, and the index will be made available for reuse in
        future streams.
         * @param index - The index of the stream to end.
         */
        endStream(index: number): void;
        /**
         * Returns the index passed to getLayer() when the given layer was created.
        Positive indices refer to visible layers, an index of zero refers to the
        default layer, and negative indices refer to buffers.
         * @param layer - The layer whose index should be determined.
         * @returns The index of the given layer, or null if no such layer is associated
            with this client.
         */
        getLayerIndex(layer: Guacamole.Display.VisibleLayer | Guacamole.Layer): number;
        /**
         * Sends a disconnect instruction to the server and closes the tunnel.
         */
        disconnect(): void;
        /**
         * Connects the underlying tunnel of this Guacamole.Client, passing the
        given arbitrary data to the tunnel during the connection process.
         * @param data - Arbitrary connection data to be sent to the underlying
                    tunnel during the connection process.
         */
        connect(data: any): void;
    }
    /**
     * A reader which automatically handles the given input stream, returning
    received blobs as a single data URI built over the course of the stream.
    Note that this object will overwrite any installed event handlers on the
    given Guacamole.InputStream.
     * @param stream - The stream that data will be read from.
     */
    class DataURIReader {
        constructor(stream: Guacamole.InputStream);
        /**
         * Returns the data URI of all data received through the underlying stream
        thus far.
         * @returns The data URI of all data received through the underlying stream thus
            far.
         */
        getURI(): string;
    }
    /**
     * The Guacamole display. The display does not deal with the Guacamole
    protocol, and instead implements a set of graphical operations which
    embody the set of operations present in the protocol. The order operations
    are executed is guaranteed to be in the same order as their corresponding
    functions are called.
     */
    class Display {
        /**
         * The X coordinate of the hotspot of the mouse cursor. The hotspot is
        the relative location within the image of the mouse cursor at which
        each click occurs.
         */
        cursorHotspotX: number;
        /**
         * The Y coordinate of the hotspot of the mouse cursor. The hotspot is
        the relative location within the image of the mouse cursor at which
        each click occurs.
         */
        cursorHotspotY: number;
        /**
         * The current X coordinate of the local mouse cursor. This is not
        necessarily the location of the actual mouse - it refers only to
        the location of the cursor image within the Guacamole display, as
        last set by moveCursor().
         */
        cursorX: number;
        /**
         * The current X coordinate of the local mouse cursor. This is not
        necessarily the location of the actual mouse - it refers only to
        the location of the cursor image within the Guacamole display, as
        last set by moveCursor().
         */
        cursorY: number;
        /**
         * Returns the element which contains the Guacamole display.
         * @returns The element containing the Guacamole display.
         */
        getElement(): Element;
        /**
         * Returns the width of this display.
         * @returns The width of this display;
         */
        getWidth(): number;
        /**
         * Returns the height of this display.
         * @returns The height of this display;
         */
        getHeight(): number;
        /**
         * Returns the default layer of this display. Each Guacamole display always
        has at least one layer. Other layers can optionally be created within
        this layer, but the default layer cannot be removed and is the absolute
        ancestor of all other layers.
         * @returns The default layer.
         */
        getDefaultLayer(): Guacamole.Display.VisibleLayer;
        /**
         * Returns the cursor layer of this display. Each Guacamole display contains
        a layer for the image of the mouse cursor. This layer is a special case
        and exists above all other layers, similar to the hardware mouse cursor.
         * @returns The cursor layer.
         */
        getCursorLayer(): Guacamole.Display.VisibleLayer;
        /**
         * Creates a new layer. The new layer will be a direct child of the default
        layer, but can be moved to be a child of any other layer. Layers returned
        by this function are visible.
         * @returns The newly-created layer.
         */
        createLayer(): Guacamole.Display.VisibleLayer;
        /**
         * Creates a new buffer. Buffers are invisible, off-screen surfaces. They
        are implemented in the same manner as layers, but do not provide the
        same nesting semantics.
         * @returns The newly-created buffer.
         */
        createBuffer(): Guacamole.Layer;
        /**
         * Flush all pending draw tasks, if possible, as a new frame. If the entire
        frame is not ready, the flush will wait until all required tasks are
        unblocked.
         * @param callback - The function to call when this frame is
                                   flushed. This may happen immediately, or
                                   later when blocked tasks become unblocked.
         */
        flush(callback: (...params: any[]) => any): void;
        /**
         * Sets the hotspot and image of the mouse cursor displayed within the
        Guacamole display.
         * @param hotspotX - The X coordinate of the cursor hotspot.
         * @param hotspotY - The Y coordinate of the cursor hotspot.
         * @param layer - The source layer containing the data which
                                       should be used as the mouse cursor image.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             layer's coordinate space to copy data from.
         */
        setCursor(hotspotX: number, hotspotY: number, layer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number): void;
        /**
         * Sets whether the software-rendered cursor is shown. This cursor differs
        from the hardware cursor in that it is built into the Guacamole.Display,
        and relies on its own Guacamole layer to render.
         * @param [shown = true] - Whether to show the software cursor.
         */
        showCursor(shown?: boolean): void;
        /**
         * Sets the location of the local cursor to the given coordinates. For the
        sake of responsiveness, this function performs its action immediately.
        Cursor motion is not maintained within atomic frames.
         * @param x - The X coordinate to move the cursor to.
         * @param y - The Y coordinate to move the cursor to.
         */
        moveCursor(x: number, y: number): void;
        /**
         * Changes the size of the given Layer to the given width and height.
        Resizing is only attempted if the new size provided is actually different
        from the current size.
         * @param layer - The layer to resize.
         * @param width - The new width.
         * @param height - The new height.
         */
        resize(layer: Guacamole.Layer, width: number, height: number): void;
        /**
         * Draws the specified image at the given coordinates. The image specified
        must already be loaded.
         * @param layer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param image - The image to draw. Note that this not a URL.
         */
        drawImage(layer: Guacamole.Layer, x: number, y: number, image: CanvasImageSource): void;
        /**
         * Draws the image contained within the specified Blob at the given
        coordinates. The Blob specified must already be populated with image
        data.
         * @param layer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param blob - The Blob containing the image data to draw.
         */
        drawBlob(layer: Guacamole.Layer, x: number, y: number, blob: Blob): void;
        /**
         * Draws the image within the given stream at the given coordinates. The
        image will be loaded automatically, and this and any future operations
        will wait for the image to finish loading. This function will
        automatically choose an approriate method for reading and decoding the
        given image stream, and should be preferred for received streams except
        where manual decoding of the stream is unavoidable.
         * @param layer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param stream - The stream along which image data will be received.
         * @param mimetype - The mimetype of the image within the stream.
         */
        drawStream(layer: Guacamole.Layer, x: number, y: number, stream: Guacamole.InputStream, mimetype: string): void;
        /**
         * Draws the image at the specified URL at the given coordinates. The image
        will be loaded automatically, and this and any future operations will
        wait for the image to finish loading.
         * @param layer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param url - The URL of the image to draw.
         */
        draw(layer: Guacamole.Layer, x: number, y: number, url: string): void;
        /**
         * Plays the video at the specified URL within this layer. The video
        will be loaded automatically, and this and any future operations will
        wait for the video to finish loading. Future operations will not be
        executed until the video finishes playing.
         * @param layer - The layer to draw upon.
         * @param mimetype - The mimetype of the video to play.
         * @param duration - The duration of the video in milliseconds.
         * @param url - The URL of the video to play.
         */
        play(layer: Guacamole.Layer, mimetype: string, duration: number, url: string): void;
        /**
         * Transfer a rectangle of image data from one Layer to this Layer using the
        specified transfer function.
         * @param srcLayer - The Layer to copy image data from.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source Layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             Layer's coordinate space to copy data from.
         * @param dstLayer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param transferFunction - The transfer function to use to
                                           transfer data from source to
                                           destination.
         */
        transfer(srcLayer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number, dstLayer: Guacamole.Layer, x: number, y: number, transferFunction: (...params: any[]) => any): void;
        /**
         * Put a rectangle of image data from one Layer to this Layer directly
        without performing any alpha blending. Simply copy the data.
         * @param srcLayer - The Layer to copy image data from.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source Layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             Layer's coordinate space to copy data from.
         * @param dstLayer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         */
        put(srcLayer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number, dstLayer: Guacamole.Layer, x: number, y: number): void;
        /**
         * Copy a rectangle of image data from one Layer to this Layer. This
        operation will copy exactly the image data that will be drawn once all
        operations of the source Layer that were pending at the time this
        function was called are complete. This operation will not alter the
        size of the source Layer even if its autosize property is set to true.
         * @param srcLayer - The Layer to copy image data from.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source Layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             Layer's coordinate space to copy data from.
         * @param dstLayer - The layer to draw upon.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         */
        copy(srcLayer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number, dstLayer: Guacamole.Layer, x: number, y: number): void;
        /**
         * Starts a new path at the specified point.
         * @param layer - The layer to draw upon.
         * @param x - The X coordinate of the point to draw.
         * @param y - The Y coordinate of the point to draw.
         */
        moveTo(layer: Guacamole.Layer, x: number, y: number): void;
        /**
         * Add the specified line to the current path.
         * @param layer - The layer to draw upon.
         * @param x - The X coordinate of the endpoint of the line to draw.
         * @param y - The Y coordinate of the endpoint of the line to draw.
         */
        lineTo(layer: Guacamole.Layer, x: number, y: number): void;
        /**
         * Add the specified arc to the current path.
         * @param layer - The layer to draw upon.
         * @param x - The X coordinate of the center of the circle which
                          will contain the arc.
         * @param y - The Y coordinate of the center of the circle which
                          will contain the arc.
         * @param radius - The radius of the circle.
         * @param startAngle - The starting angle of the arc, in radians.
         * @param endAngle - The ending angle of the arc, in radians.
         * @param negative - Whether the arc should be drawn in order of
                                  decreasing angle.
         */
        arc(layer: Guacamole.Layer, x: number, y: number, radius: number, startAngle: number, endAngle: number, negative: boolean): void;
        /**
         * Starts a new path at the specified point.
         * @param layer - The layer to draw upon.
         * @param cp1x - The X coordinate of the first control point.
         * @param cp1y - The Y coordinate of the first control point.
         * @param cp2x - The X coordinate of the second control point.
         * @param cp2y - The Y coordinate of the second control point.
         * @param x - The X coordinate of the endpoint of the curve.
         * @param y - The Y coordinate of the endpoint of the curve.
         */
        curveTo(layer: Guacamole.Layer, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * Closes the current path by connecting the end point with the start
        point (if any) with a straight line.
         * @param layer - The layer to draw upon.
         */
        close(layer: Guacamole.Layer): void;
        /**
         * Add the specified rectangle to the current path.
         * @param layer - The layer to draw upon.
         * @param x - The X coordinate of the upper-left corner of the
                          rectangle to draw.
         * @param y - The Y coordinate of the upper-left corner of the
                          rectangle to draw.
         * @param w - The width of the rectangle to draw.
         * @param h - The height of the rectangle to draw.
         */
        rect(layer: Guacamole.Layer, x: number, y: number, w: number, h: number): void;
        /**
         * Clip all future drawing operations by the current path. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as fillColor()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param layer - The layer to affect.
         */
        clip(layer: Guacamole.Layer): void;
        /**
         * Stroke the current path with the specified color. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param layer - The layer to draw upon.
         * @param cap - The line cap style. Can be "round", "square",
                            or "butt".
         * @param join - The line join style. Can be "round", "bevel",
                             or "miter".
         * @param thickness - The line thickness in pixels.
         * @param r - The red component of the color to fill.
         * @param g - The green component of the color to fill.
         * @param b - The blue component of the color to fill.
         * @param a - The alpha component of the color to fill.
         */
        strokeColor(layer: Guacamole.Layer, cap: string, join: string, thickness: number, r: number, g: number, b: number, a: number): void;
        /**
         * Fills the current path with the specified color. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param layer - The layer to draw upon.
         * @param r - The red component of the color to fill.
         * @param g - The green component of the color to fill.
         * @param b - The blue component of the color to fill.
         * @param a - The alpha component of the color to fill.
         */
        fillColor(layer: Guacamole.Layer, r: number, g: number, b: number, a: number): void;
        /**
         * Stroke the current path with the image within the specified layer. The
        image data will be tiled infinitely within the stroke. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param layer - The layer to draw upon.
         * @param cap - The line cap style. Can be "round", "square",
                            or "butt".
         * @param join - The line join style. Can be "round", "bevel",
                             or "miter".
         * @param thickness - The line thickness in pixels.
         * @param srcLayer - The layer to use as a repeating pattern
                                          within the stroke.
         */
        strokeLayer(layer: Guacamole.Layer, cap: string, join: string, thickness: number, srcLayer: Guacamole.Layer): void;
        /**
         * Fills the current path with the image within the specified layer. The
        image data will be tiled infinitely within the stroke. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param layer - The layer to draw upon.
         * @param srcLayer - The layer to use as a repeating pattern
                                          within the fill.
         */
        fillLayer(layer: Guacamole.Layer, srcLayer: Guacamole.Layer): void;
        /**
         * Push current layer state onto stack.
         * @param layer - The layer to draw upon.
         */
        push(layer: Guacamole.Layer): void;
        /**
         * Pop layer state off stack.
         * @param layer - The layer to draw upon.
         */
        pop(layer: Guacamole.Layer): void;
        /**
         * Reset the layer, clearing the stack, the current path, and any transform
        matrix.
         * @param layer - The layer to draw upon.
         */
        reset(layer: Guacamole.Layer): void;
        /**
         * Sets the given affine transform (defined with six values from the
        transform's matrix).
         * @param layer - The layer to modify.
         * @param a - The first value in the affine transform's matrix.
         * @param b - The second value in the affine transform's matrix.
         * @param c - The third value in the affine transform's matrix.
         * @param d - The fourth value in the affine transform's matrix.
         * @param e - The fifth value in the affine transform's matrix.
         * @param f - The sixth value in the affine transform's matrix.
         */
        setTransform(layer: Guacamole.Layer, a: number, b: number, c: number, d: number, e: number, f: number): void;
        /**
         * Applies the given affine transform (defined with six values from the
        transform's matrix).
         * @param layer - The layer to modify.
         * @param a - The first value in the affine transform's matrix.
         * @param b - The second value in the affine transform's matrix.
         * @param c - The third value in the affine transform's matrix.
         * @param d - The fourth value in the affine transform's matrix.
         * @param e - The fifth value in the affine transform's matrix.
         * @param f - The sixth value in the affine transform's matrix.
         */
        transform(layer: Guacamole.Layer, a: number, b: number, c: number, d: number, e: number, f: number): void;
        /**
         * Sets the channel mask for future operations on this Layer.
        
        The channel mask is a Guacamole-specific compositing operation identifier
        with a single bit representing each of four channels (in order): source
        image where destination transparent, source where destination opaque,
        destination where source transparent, and destination where source
        opaque.
         * @param layer - The layer to modify.
         * @param mask - The channel mask for future operations on this
                             Layer.
         */
        setChannelMask(layer: Guacamole.Layer, mask: number): void;
        /**
         * Sets the miter limit for stroke operations using the miter join. This
        limit is the maximum ratio of the size of the miter join to the stroke
        width. If this ratio is exceeded, the miter will not be drawn for that
        joint of the path.
         * @param layer - The layer to modify.
         * @param limit - The miter limit for stroke operations using the
                              miter join.
         */
        setMiterLimit(layer: Guacamole.Layer, limit: number): void;
        /**
         * Removes the given layer container entirely, such that it is no longer
        contained within its parent layer, if any.
         * @param layer - The layer being removed from its parent.
         */
        dispose(layer: Guacamole.Display.VisibleLayer): void;
        /**
         * Applies the given affine transform (defined with six values from the
        transform's matrix) to the given layer.
         * @param layer - The layer being distorted.
         * @param a - The first value in the affine transform's matrix.
         * @param b - The second value in the affine transform's matrix.
         * @param c - The third value in the affine transform's matrix.
         * @param d - The fourth value in the affine transform's matrix.
         * @param e - The fifth value in the affine transform's matrix.
         * @param f - The sixth value in the affine transform's matrix.
         */
        distort(layer: Guacamole.Display.VisibleLayer, a: number, b: number, c: number, d: number, e: number, f: number): void;
        /**
         * Moves the upper-left corner of the given layer to the given X and Y
        coordinate, sets the Z stacking order, and reparents the layer
        to the given parent layer.
         * @param layer - The layer being moved.
         * @param parent - The parent to set.
         * @param x - The X coordinate to move to.
         * @param y - The Y coordinate to move to.
         * @param z - The Z coordinate to move to.
         */
        move(layer: Guacamole.Display.VisibleLayer, parent: Guacamole.Display.VisibleLayer, x: number, y: number, z: number): void;
        /**
         * Sets the opacity of the given layer to the given value, where 255 is
        fully opaque and 0 is fully transparent.
         * @param layer - The layer whose opacity should be set.
         * @param alpha - The opacity to set.
         */
        shade(layer: Guacamole.Display.VisibleLayer, alpha: number): void;
        /**
         * Sets the scale of the client display element such that it renders at
        a relatively smaller or larger size, without affecting the true
        resolution of the display.
         * @param scale - The scale to resize to, where 1.0 is normal
                              size (1:1 scale).
         */
        scale(scale: number): void;
        /**
         * Returns the scale of the display.
         * @returns The scale of the display.
         */
        getScale(): number;
        /**
         * Returns a canvas element containing the entire display, with all child
        layers composited within.
         * @returns A new canvas element containing a copy of
                                    the display.
         */
        flatten(): HTMLCanvasElement;
    }
    namespace Display {
        /**
         * Simple container for Guacamole.Layer, allowing layers to be easily
        repositioned and nested. This allows certain operations to be accelerated
        through DOM manipulation, rather than raster operations.
         * @param width - The width of the Layer, in pixels. The canvas element
                              backing this Layer will be given this width.
         * @param height - The height of the Layer, in pixels. The canvas element
                               backing this Layer will be given this height.
         */
        class VisibleLayer extends Guacamole.Layer {
            constructor(width: number, height: number);
            /**
             * The opacity of the layer container, where 255 is fully opaque and 0 is
            fully transparent.
             */
            alpha: any;
            /**
             * X coordinate of the upper-left corner of this layer container within
            its parent, in pixels.
             */
            x: number;
            /**
             * Y coordinate of the upper-left corner of this layer container within
            its parent, in pixels.
             */
            y: number;
            /**
             * Z stacking order of this layer relative to other sibling layers.
             */
            z: number;
            /**
             * The affine transformation applied to this layer container. Each element
            corresponds to a value from the transformation matrix, with the first
            three values being the first row, and the last three values being the
            second row. There are six values total.
             */
            matrix: Number[];
            /**
             * The parent layer container of this layer, if any.
             */
            parent: Guacamole.Display.VisibleLayer;
            /**
             * Set of all children of this layer, indexed by layer index. This object
            will have one property per child.
             */
            children: any;
            /**
             * Returns the element containing the canvas and any other elements
            associated with this layer.
             * @returns The element containing this layer's canvas.
             */
            getElement(): Element;
            /**
             * Moves the upper-left corner of this layer to the given X and Y
            coordinate.
             * @param x - The X coordinate to move to.
             * @param y - The Y coordinate to move to.
             */
            translate(x: number, y: number): void;
            /**
             * Moves the upper-left corner of this VisibleLayer to the given X and Y
            coordinate, sets the Z stacking order, and reparents this VisibleLayer
            to the given VisibleLayer.
             * @param parent - The parent to set.
             * @param x - The X coordinate to move to.
             * @param y - The Y coordinate to move to.
             * @param z - The Z coordinate to move to.
             */
            move(parent: Guacamole.Display.VisibleLayer, x: number, y: number, z: number): void;
            /**
             * Sets the opacity of this layer to the given value, where 255 is fully
            opaque and 0 is fully transparent.
             * @param a - The opacity to set.
             */
            shade(a: number): void;
            /**
             * Removes this layer container entirely, such that it is no longer
            contained within its parent layer, if any.
             */
            dispose(): void;
            /**
             * Applies the given affine transform (defined with six values from the
            transform's matrix).
             * @param a - The first value in the affine transform's matrix.
             * @param b - The second value in the affine transform's matrix.
             * @param c - The third value in the affine transform's matrix.
             * @param d - The fourth value in the affine transform's matrix.
             * @param e - The fifth value in the affine transform's matrix.
             * @param f - The sixth value in the affine transform's matrix.
             */
            distort(a: number, b: number, c: number, d: number, e: number, f: number): void;
            /**
             * Changes the size of this Layer to the given width and height. Resizing
            is only attempted if the new size provided is actually different from
            the current size.
             * @param newWidth - The new width to assign to this Layer.
             * @param newHeight - The new height to assign to this Layer.
             */
            resize(newWidth: number, newHeight: number): void;
        }
    }
    /**
     * A hidden input field which attempts to keep itself focused at all times,
    except when another input field has been intentionally focused, whether
    programatically or by the user. The actual underlying input field, returned
    by getElement(), may be used as a reliable source of keyboard-related events,
    particularly composition and input events which may require a focused input
    field to be dispatched at all.
     */
    class InputSink {
        /**
         * Attempts to focus the underlying input field. The focus attempt occurs
        asynchronously, and may silently fail depending on browser restrictions.
         */
        focus(): void;
        /**
         * Returns the underlying input field. This input field MUST be manually
        added to the DOM for the Guacamole.InputSink to have any effect.
         */
        getElement(): Element;
    }
    /**
     * An input stream abstraction used by the Guacamole client to facilitate
    transfer of files or other binary data.
     * @param client - The client owning this stream.
     * @param index - The index of this stream.
     */
    class InputStream {
        constructor(client: Guacamole.Client, index: number);
        /**
         * The index of this stream.
         */
        index: number;
        /**
         * Acknowledges the receipt of a blob.
         * @param message - A human-readable message describing the error
                                or status.
         * @param code - The error code, if any, or 0 for success.
         */
        sendAck(message: string, code: number): void;
    }
    /**
     * Integer pool which returns consistently increasing integers while integers
    are in use, and previously-used integers when possible.
     */
    class IntegerPool {
        /**
         * The next integer to return if no more integers remain.
         */
        next_int: number;
        /**
         * Returns the next available integer in the pool. If possible, a previously
        used integer will be returned.
         * @returns The next available integer.
         */
        next(): number;
        /**
         * Frees the given integer, allowing it to be reused.
         * @param integer - The integer to free.
         */
        free(integer: number): void;
    }
    /**
     * A reader which automatically handles the given input stream, assembling all
    received blobs into a JavaScript object by appending them to each other, in
    order, and decoding the result as JSON. Note that this object will overwrite
    any installed event handlers on the given Guacamole.InputStream.
     * @param stream - The stream that JSON will be read from.
     */
    class JSONReader {
        constructor(stream: Guacamole.InputStream);
        /**
         * Returns the current length of this Guacamole.JSONReader, in characters.
         * @returns The current length of this Guacamole.JSONReader.
         */
        getLength(): number;
        /**
         * Returns the contents of this Guacamole.JSONReader as a JavaScript
        object.
         * @returns The contents of this Guacamole.JSONReader, as parsed from the JSON
            contents of the input stream.
         */
        getJSON(): any;
    }
    /**
     * Provides cross-browser and cross-keyboard keyboard for a specific element.
    Browser and keyboard layout variation is abstracted away, providing events
    which represent keys as their corresponding X11 keysym.
     * @param [element] - The Element to use to provide keyboard events. If omitted, at least one
       Element must be manually provided through the listenTo() function for
       the Guacamole.Keyboard instance to have any effect.
     */
    class Keyboard {
        constructor(element?: Element | Document);
        /**
         * All modifiers and their states.
         */
        modifiers: any;
        /**
         * The state of every key, indexed by keysym. If a particular key is
        pressed, the value of pressed for that keysym will be true. If a key
        is not currently pressed, it will not be defined.
         */
        pressed: any;
        /**
         * Returns true if the given keysym corresponds to a printable character,
        false otherwise.
         * @param keysym - The keysym to check.
         * @returns true if the given keysym corresponds to a printable character,
            false otherwise.
         */
        isPrintable(keysym: number): boolean;
        /**
         * Marks a key as pressed, firing the keydown event if registered. Key
        repeat for the pressed key will start after a delay if that key is
        not a modifier. The return value of this function depends on the
        return value of the keydown event handler, if any.
         * @param keysym - The keysym of the key to press.
         * @returns true if event should NOT be canceled, false otherwise.
         */
        press(keysym: number): boolean;
        /**
         * Marks a key as released, firing the keyup event if registered.
         * @param keysym - The keysym of the key to release.
         */
        release(keysym: number): void;
        /**
         * Presses and releases the keys necessary to type the given string of
        text.
         * @param str - The string to type.
         */
        type(str: string): void;
        /**
         * Resets the state of this keyboard, releasing all keys, and firing keyup
        events for each released key.
         */
        reset(): void;
        /**
         * Attempts to mark the given Event as having been handled by this
        Guacamole.Keyboard. If the Event has already been marked as handled,
        false is returned.
         * @param e - The Event to mark.
         * @returns true if the given Event was successfully marked, false if the given
            Event was already marked.
         */
        markEvent(e: Event): boolean;
        /**
         * Attaches event listeners to the given Element, automatically translating
        received key, input, and composition events into simple keydown/keyup
        events signalled through this Guacamole.Keyboard's onkeydown and
        onkeyup handlers.
         * @param element - The Element to attach event listeners to for the sake of handling
            key or input events.
         */
        listenTo(element: Element | Document): void;
    }
    namespace Keyboard {
        /**
         * The state of all supported keyboard modifiers.
         */
        class ModifierState {
            /**
             * Whether shift is currently pressed.
             */
            shift: boolean;
            /**
             * Whether ctrl is currently pressed.
             */
            ctrl: boolean;
            /**
             * Whether alt is currently pressed.
             */
            alt: boolean;
            /**
             * Whether meta (apple key) is currently pressed.
             */
            meta: boolean;
            /**
             * Whether hyper (windows key) is currently pressed.
             */
            hyper: boolean;
            /**
             * Returns the modifier state applicable to the keyboard event given.
             * @param e - The keyboard event to read.
             * @returns The current state of keyboard
                                                        modifiers.
             */
            static fromKeyboardEvent(e: KeyboardEvent): Guacamole.Keyboard.ModifierState;
        }
    }
    /**
     * Abstract ordered drawing surface. Each Layer contains a canvas element and
    provides simple drawing instructions for drawing to that canvas element,
    however unlike the canvas element itself, drawing operations on a Layer are
    guaranteed to run in order, even if such an operation must wait for an image
    to load before completing.
     * @param width - The width of the Layer, in pixels. The canvas element
                          backing this Layer will be given this width.
     * @param height - The height of the Layer, in pixels. The canvas element
                           backing this Layer will be given this height.
     */
    class Layer {
        constructor(width: number, height: number);
        /**
         * Set to true if this Layer should resize itself to accomodate the
        dimensions of any drawing operation, and false (the default) otherwise.
        
        Note that setting this property takes effect immediately, and thus may
        take effect on operations that were started in the past but have not
        yet completed. If you wish the setting of this flag to only modify
        future operations, you will need to make the setting of this flag an
        operation with sync().
         * @example
         * // Set autosize to true for all future operations
        layer.sync(function() {
            layer.autosize = true;
        });
         */
        autosize: boolean;
        /**
         * The current width of this layer.
         */
        width: number;
        /**
         * The current height of this layer.
         */
        height: number;
        /**
         * Returns the canvas element backing this Layer. Note that the dimensions
        of the canvas may not exactly match those of the Layer, as resizing a
        canvas while maintaining its state is an expensive operation.
         * @returns The canvas element backing this Layer.
         */
        getCanvas(): HTMLCanvasElement;
        /**
         * Returns a new canvas element containing the same image as this Layer.
        Unlike getCanvas(), the canvas element returned is guaranteed to have
        the exact same dimensions as the Layer.
         * @returns A new canvas element containing a copy of the image content this
            Layer.
         */
        toCanvas(): HTMLCanvasElement;
        /**
         * Changes the size of this Layer to the given width and height. Resizing
        is only attempted if the new size provided is actually different from
        the current size.
         * @param newWidth - The new width to assign to this Layer.
         * @param newHeight - The new height to assign to this Layer.
         */
        resize(newWidth: number, newHeight: number): void;
        /**
         * Draws the specified image at the given coordinates. The image specified
        must already be loaded.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param image - The image to draw. Note that this is not a URL.
         */
        drawImage(x: number, y: number, image: CanvasImageSource): void;
        /**
         * Transfer a rectangle of image data from one Layer to this Layer using the
        specified transfer function.
         * @param srcLayer - The Layer to copy image data from.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source Layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             Layer's coordinate space to copy data from.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         * @param transferFunction - The transfer function to use to
                                           transfer data from source to
                                           destination.
         */
        transfer(srcLayer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number, x: number, y: number, transferFunction: (...params: any[]) => any): void;
        /**
         * Put a rectangle of image data from one Layer to this Layer directly
        without performing any alpha blending. Simply copy the data.
         * @param srcLayer - The Layer to copy image data from.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source Layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             Layer's coordinate space to copy data from.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         */
        put(srcLayer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number, x: number, y: number): void;
        /**
         * Copy a rectangle of image data from one Layer to this Layer. This
        operation will copy exactly the image data that will be drawn once all
        operations of the source Layer that were pending at the time this
        function was called are complete. This operation will not alter the
        size of the source Layer even if its autosize property is set to true.
         * @param srcLayer - The Layer to copy image data from.
         * @param srcx - The X coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcy - The Y coordinate of the upper-left corner of the
                             rectangle within the source Layer's coordinate
                             space to copy data from.
         * @param srcw - The width of the rectangle within the source Layer's
                             coordinate space to copy data from.
         * @param srch - The height of the rectangle within the source
                             Layer's coordinate space to copy data from.
         * @param x - The destination X coordinate.
         * @param y - The destination Y coordinate.
         */
        copy(srcLayer: Guacamole.Layer, srcx: number, srcy: number, srcw: number, srch: number, x: number, y: number): void;
        /**
         * Starts a new path at the specified point.
         * @param x - The X coordinate of the point to draw.
         * @param y - The Y coordinate of the point to draw.
         */
        moveTo(x: number, y: number): void;
        /**
         * Add the specified line to the current path.
         * @param x - The X coordinate of the endpoint of the line to draw.
         * @param y - The Y coordinate of the endpoint of the line to draw.
         */
        lineTo(x: number, y: number): void;
        /**
         * Add the specified arc to the current path.
         * @param x - The X coordinate of the center of the circle which
                          will contain the arc.
         * @param y - The Y coordinate of the center of the circle which
                          will contain the arc.
         * @param radius - The radius of the circle.
         * @param startAngle - The starting angle of the arc, in radians.
         * @param endAngle - The ending angle of the arc, in radians.
         * @param negative - Whether the arc should be drawn in order of
                                  decreasing angle.
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, negative: boolean): void;
        /**
         * Starts a new path at the specified point.
         * @param cp1x - The X coordinate of the first control point.
         * @param cp1y - The Y coordinate of the first control point.
         * @param cp2x - The X coordinate of the second control point.
         * @param cp2y - The Y coordinate of the second control point.
         * @param x - The X coordinate of the endpoint of the curve.
         * @param y - The Y coordinate of the endpoint of the curve.
         */
        curveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * Closes the current path by connecting the end point with the start
        point (if any) with a straight line.
         */
        close(): void;
        /**
         * Add the specified rectangle to the current path.
         * @param x - The X coordinate of the upper-left corner of the
                          rectangle to draw.
         * @param y - The Y coordinate of the upper-left corner of the
                          rectangle to draw.
         * @param w - The width of the rectangle to draw.
         * @param h - The height of the rectangle to draw.
         */
        rect(x: number, y: number, w: number, h: number): void;
        /**
         * Clip all future drawing operations by the current path. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as fillColor()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         */
        clip(): void;
        /**
         * Stroke the current path with the specified color. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param cap - The line cap style. Can be "round", "square",
                            or "butt".
         * @param join - The line join style. Can be "round", "bevel",
                             or "miter".
         * @param thickness - The line thickness in pixels.
         * @param r - The red component of the color to fill.
         * @param g - The green component of the color to fill.
         * @param b - The blue component of the color to fill.
         * @param a - The alpha component of the color to fill.
         */
        strokeColor(cap: string, join: string, thickness: number, r: number, g: number, b: number, a: number): void;
        /**
         * Fills the current path with the specified color. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param r - The red component of the color to fill.
         * @param g - The green component of the color to fill.
         * @param b - The blue component of the color to fill.
         * @param a - The alpha component of the color to fill.
         */
        fillColor(r: number, g: number, b: number, a: number): void;
        /**
         * Stroke the current path with the image within the specified layer. The
        image data will be tiled infinitely within the stroke. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param cap - The line cap style. Can be "round", "square",
                            or "butt".
         * @param join - The line join style. Can be "round", "bevel",
                             or "miter".
         * @param thickness - The line thickness in pixels.
         * @param srcLayer - The layer to use as a repeating pattern
                                          within the stroke.
         */
        strokeLayer(cap: string, join: string, thickness: number, srcLayer: Guacamole.Layer): void;
        /**
         * Fills the current path with the image within the specified layer. The
        image data will be tiled infinitely within the stroke. The current path
        is implicitly closed. The current path can continue to be reused
        for other operations (such as clip()) but a new path will be started
        once a path drawing operation (path() or rect()) is used.
         * @param srcLayer - The layer to use as a repeating pattern
                                          within the fill.
         */
        fillLayer(srcLayer: Guacamole.Layer): void;
        /**
         * Push current layer state onto stack.
         */
        push(): void;
        /**
         * Pop layer state off stack.
         */
        pop(): void;
        /**
         * Reset the layer, clearing the stack, the current path, and any transform
        matrix.
         */
        reset(): void;
        /**
         * Sets the given affine transform (defined with six values from the
        transform's matrix).
         * @param a - The first value in the affine transform's matrix.
         * @param b - The second value in the affine transform's matrix.
         * @param c - The third value in the affine transform's matrix.
         * @param d - The fourth value in the affine transform's matrix.
         * @param e - The fifth value in the affine transform's matrix.
         * @param f - The sixth value in the affine transform's matrix.
         */
        setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
        /**
         * Applies the given affine transform (defined with six values from the
        transform's matrix).
         * @param a - The first value in the affine transform's matrix.
         * @param b - The second value in the affine transform's matrix.
         * @param c - The third value in the affine transform's matrix.
         * @param d - The fourth value in the affine transform's matrix.
         * @param e - The fifth value in the affine transform's matrix.
         * @param f - The sixth value in the affine transform's matrix.
         */
        transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
        /**
         * Sets the channel mask for future operations on this Layer.
        
        The channel mask is a Guacamole-specific compositing operation identifier
        with a single bit representing each of four channels (in order): source
        image where destination transparent, source where destination opaque,
        destination where source transparent, and destination where source
        opaque.
         * @param mask - The channel mask for future operations on this
                             Layer.
         */
        setChannelMask(mask: number): void;
        /**
         * Sets the miter limit for stroke operations using the miter join. This
        limit is the maximum ratio of the size of the miter join to the stroke
        width. If this ratio is exceeded, the miter will not be drawn for that
        joint of the path.
         * @param limit - The miter limit for stroke operations using the
                              miter join.
         */
        setMiterLimit(limit: number): void;
        /**
         * Channel mask for the composite operation "rout".
         */
        static ROUT: any;
        /**
         * Channel mask for the composite operation "atop".
         */
        static ATOP: any;
        /**
         * Channel mask for the composite operation "xor".
         */
        static XOR: any;
        /**
         * Channel mask for the composite operation "rover".
         */
        static ROVER: any;
        /**
         * Channel mask for the composite operation "over".
         */
        static OVER: any;
        /**
         * Channel mask for the composite operation "plus".
         */
        static PLUS: any;
        /**
         * Channel mask for the composite operation "rin".
        Beware that WebKit-based browsers may leave the contents of the destionation
        layer where the source layer is transparent, despite the definition of this
        operation.
         */
        static RIN: any;
        /**
         * Channel mask for the composite operation "in".
        Beware that WebKit-based browsers may leave the contents of the destionation
        layer where the source layer is transparent, despite the definition of this
        operation.
         */
        static IN: any;
        /**
         * Channel mask for the composite operation "out".
        Beware that WebKit-based browsers may leave the contents of the destionation
        layer where the source layer is transparent, despite the definition of this
        operation.
         */
        static OUT: any;
        /**
         * Channel mask for the composite operation "ratop".
        Beware that WebKit-based browsers may leave the contents of the destionation
        layer where the source layer is transparent, despite the definition of this
        operation.
         */
        static RATOP: any;
        /**
         * Channel mask for the composite operation "src".
        Beware that WebKit-based browsers may leave the contents of the destionation
        layer where the source layer is transparent, despite the definition of this
        operation.
         */
        static SRC: any;
    }
    namespace Layer {
        /**
         * Represents a single pixel of image data. All components have a minimum value
        of 0 and a maximum value of 255.
         * @param r - The red component of this pixel.
         * @param g - The green component of this pixel.
         * @param b - The blue component of this pixel.
         * @param a - The alpha component of this pixel.
         */
        class Pixel {
            constructor(r: number, g: number, b: number, a: number);
            /**
             * The red component of this pixel, where 0 is the minimum value,
            and 255 is the maximum.
             */
            red: any;
            /**
             * The green component of this pixel, where 0 is the minimum value,
            and 255 is the maximum.
             */
            green: any;
            /**
             * The blue component of this pixel, where 0 is the minimum value,
            and 255 is the maximum.
             */
            blue: any;
            /**
             * The alpha component of this pixel, where 0 is the minimum value,
            and 255 is the maximum.
             */
            alpha: any;
        }
    }
    /**
     * Provides cross-browser mouse events for a given element. The events of
    the given element are automatically populated with handlers that translate
    mouse events into a non-browser-specific event provided by the
    Guacamole.Mouse instance.
     * @param element - The Element to use to provide mouse events.
     */
    class Mouse {
        constructor(element: Element);
        /**
         * The number of mousemove events to require before re-enabling mouse
        event handling after receiving a touch event.
         */
        touchMouseThreshold: any;
        /**
         * The minimum amount of pixels scrolled required for a single scroll button
        click.
         */
        scrollThreshold: any;
        /**
         * The number of pixels to scroll per line.
         */
        PIXELS_PER_LINE: any;
        /**
         * The number of pixels to scroll per page.
         */
        PIXELS_PER_PAGE: any;
        /**
         * The current mouse state. The properties of this state are updated when
        mouse events fire. This state object is also passed in as a parameter to
        the handler of any mouse events.
         */
        currentState: Guacamole.Mouse.State;
        /**
         * Changes the local mouse cursor to the given canvas, having the given
        hotspot coordinates. This affects styling of the element backing this
        Guacamole.Mouse only, and may fail depending on browser support for
        setting the mouse cursor.
        
        If setting the local cursor is desired, it is up to the implementation
        to do something else, such as use the software cursor built into
        Guacamole.Display, if the local cursor cannot be set.
         * @param canvas - The cursor image.
         * @param x - The X-coordinate of the cursor hotspot.
         * @param y - The Y-coordinate of the cursor hotspot.
         * @returns true if the cursor was successfully set, false if the
                          cursor could not be set for any reason.
         */
        setCursor(canvas: HTMLCanvasElement, x: number, y: number): boolean;
    }
    namespace Mouse {
        /**
         * Simple container for properties describing the state of a mouse.
         * @param x - The X position of the mouse pointer in pixels.
         * @param y - The Y position of the mouse pointer in pixels.
         * @param left - Whether the left mouse button is pressed.
         * @param middle - Whether the middle mouse button is pressed.
         * @param right - Whether the right mouse button is pressed.
         * @param up - Whether the up mouse button is pressed (the fourth
                            button, usually part of a scroll wheel).
         * @param down - Whether the down mouse button is pressed (the fifth
                              button, usually part of a scroll wheel).
         */
        class State {
            constructor(x: number, y: number, left: boolean, middle: boolean, right: boolean, up: boolean, down: boolean);
            /**
             * The current X position of the mouse pointer.
             */
            x: number;
            /**
             * The current Y position of the mouse pointer.
             */
            y: number;
            /**
             * Whether the left mouse button is currently pressed.
             */
            left: boolean;
            /**
             * Whether the middle mouse button is currently pressed.
             */
            middle: boolean;
            /**
             * Whether the right mouse button is currently pressed.
             */
            right: boolean;
            /**
             * Whether the up mouse button is currently pressed. This is the fourth
            mouse button, associated with upward scrolling of the mouse scroll
            wheel.
             */
            up: boolean;
            /**
             * Whether the down mouse button is currently pressed. This is the fifth
            mouse button, associated with downward scrolling of the mouse scroll
            wheel.
             */
            down: boolean;
            /**
             * Updates the position represented within this state object by the given
            element and clientX/clientY coordinates (commonly available within event
            objects). Position is translated from clientX/clientY (relative to
            viewport) to element-relative coordinates.
             * @param element - The element the coordinates should be relative
                                     to.
             * @param clientX - The X coordinate to translate, viewport-relative.
             * @param clientY - The Y coordinate to translate, viewport-relative.
             */
            fromClientPosition(element: Element, clientX: number, clientY: number): void;
        }
        /**
         * Provides cross-browser relative touch event translation for a given element.
        
        Touch events are translated into mouse events as if the touches occurred
        on a touchpad (drag to push the mouse pointer, tap to click).
         * @param element - The Element to use to provide touch events.
         */
        class Touchpad {
            constructor(element: Element);
            /**
             * The distance a two-finger touch must move per scrollwheel event, in
            pixels.
             */
            scrollThreshold: any;
            /**
             * The maximum number of milliseconds to wait for a touch to end for the
            gesture to be considered a click.
             */
            clickTimingThreshold: any;
            /**
             * The maximum number of pixels to allow a touch to move for the gesture to
            be considered a click.
             */
            clickMoveThreshold: any;
            /**
             * The current mouse state. The properties of this state are updated when
            mouse events fire. This state object is also passed in as a parameter to
            the handler of any mouse events.
             */
            currentState: Guacamole.Mouse.State;
        }
        /**
         * Provides cross-browser absolute touch event translation for a given element.
        
        Touch events are translated into mouse events as if the touches occurred
        on a touchscreen (tapping anywhere on the screen clicks at that point,
        long-press to right-click).
         * @param element - The Element to use to provide touch events.
         */
        class Touchscreen {
            constructor(element: Element);
            /**
             * The distance a two-finger touch must move per scrollwheel event, in
            pixels.
             */
            scrollThreshold: any;
            /**
             * The maximum number of milliseconds to wait for a touch to end for the
            gesture to be considered a click.
             */
            clickTimingThreshold: any;
            /**
             * The maximum number of pixels to allow a touch to move for the gesture to
            be considered a click.
             */
            clickMoveThreshold: any;
            /**
             * The amount of time a press must be held for long press to be
            detected.
             */
            longPressThreshold: any;
            /**
             * The current mouse state. The properties of this state are updated when
            mouse events fire. This state object is also passed in as a parameter to
            the handler of any mouse events.
             */
            currentState: Guacamole.Mouse.State;
        }
    }
    /**
     * An object used by the Guacamole client to house arbitrarily-many named
    input and output streams.
     * @param client - The client owning this object.
     * @param index - The index of this object.
     */
    class Object {
        constructor(client: Guacamole.Client, index: number);
        /**
         * The index of this object.
         */
        index: number;
        /**
         * Requests read access to the input stream having the given name. If
        successful, a new input stream will be created.
         * @param name - The name of the input stream to request.
         * @param [bodyCallback] - The callback to invoke when the body of the requested input stream
            is received. This callback will be provided a Guacamole.InputStream
            and its mimetype as its two only arguments. If the onbody handler of
            this object is overridden, this callback will not be invoked.
         */
        requestInputStream(name: string, bodyCallback?: (...params: any[]) => any): void;
        /**
         * Creates a new output stream associated with this object and having the
        given mimetype and name. The legality of a mimetype and name is dictated
        by the object itself.
         * @param mimetype - The mimetype of the data which will be sent to the output stream.
         * @param name - The defined name of an output stream within this object.
         * @returns An output stream which will write blobs to the named output stream
            of this object.
         */
        createOutputStream(mimetype: string, name: string): Guacamole.OutputStream;
        /**
         * The reserved name denoting the root stream of any object. The contents of
        the root stream MUST be a JSON map of stream name to mimetype.
         */
        static readonly ROOT_STREAM: string;
        /**
         * The mimetype of a stream containing JSON which maps available stream names
        to their corresponding mimetype. The root stream of a Guacamole.Object MUST
        have this mimetype.
         */
        static readonly STREAM_INDEX_MIMETYPE: string;
    }
    /**
     * Dynamic on-screen keyboard. Given the layout object for an on-screen
    keyboard, this object will construct a clickable on-screen keyboard with its
    own key events.
     * @param layout - The layout of the on-screen keyboard to display.
     */
    class OnScreenKeyboard {
        constructor(layout: Guacamole.OnScreenKeyboard.Layout);
        /**
         * The number of mousemove events to require before re-enabling mouse
        event handling after receiving a touch event.
         */
        touchMouseThreshold: number;
        /**
         * The keyboard layout provided at time of construction.
         */
        layout: Guacamole.OnScreenKeyboard.Layout;
        /**
         * Returns the element containing the entire on-screen keyboard.
         * @returns The element containing the entire on-screen keyboard.
         */
        getElement(): Element;
        /**
         * Resizes all elements within this Guacamole.OnScreenKeyboard such that
        the width is close to but does not exceed the specified width. The
        height of the keyboard is determined based on the width.
         * @param width - The width to resize this Guacamole.OnScreenKeyboard
                              to, in pixels.
         */
        resize(width: number): void;
        /**
         * Map of all key names to their corresponding set of keys. Each key name
        may correspond to multiple keys due to the effect of modifiers.
         */
        keys: {
            [key: string]: Guacamole.OnScreenKeyboard.Key[];
        };
    }
    namespace OnScreenKeyboard {
        /**
         * Represents an entire on-screen keyboard layout, including all available
        keys, their behaviors, and their relative position and sizing.
         * @param template - The object whose identically-named properties will be used to initialize
            the properties of this layout.
         */
        class Layout {
            constructor(template: Guacamole.OnScreenKeyboard.Layout | any);
            /**
             * The language of keyboard layout, such as "en_US". This property is for
            informational purposes only, but it is recommend to conform to the
            [language code]_[country code] format.
             */
            language: string;
            /**
             * The type of keyboard layout, such as "qwerty". This property is for
            informational purposes only, and does not conform to any standard.
             */
            type: string;
            /**
             * Map of key name to corresponding keysym, title, or key object. If only
            the keysym or title is provided, the key object will be created
            implicitly. In all cases, the name property of the key object will be
            taken from the name given in the mapping.
             */
            keys: {
                [key: string]: Number | String | Guacamole.OnScreenKeyboard.Key | Guacamole.OnScreenKeyboard.Key[];
            };
            /**
             * Arbitrarily nested, arbitrarily grouped key names. The contents of the
            layout will be traversed to produce an identically-nested grouping of
            keys in the DOM tree. All strings will be transformed into their
            corresponding sets of keys, while all objects and arrays will be
            transformed into named groups and anonymous groups respectively. Any
            numbers present will be transformed into gaps of that size, scaled
            according to the same units as each key.
             */
            layout: any;
            /**
             * The width of the entire keyboard, in arbitrary units. The width of each
            key is relative to this width, as both width values are assumed to be in
            the same units. The conversion factor between these units and pixels is
            derived later via a call to resize() on the Guacamole.OnScreenKeyboard.
             */
            width: number;
            /**
             * The width of each key, in arbitrary units, relative to other keys in
            this layout. The true pixel size of each key will be determined by the
            overall size of the keyboard. If not defined here, the width of each
            key will default to 1.
             */
            keyWidths: {
                [key: string]: Number;
            };
        }
        /**
         * Represents a single key, or a single possible behavior of a key. Each key
        on the on-screen keyboard must have at least one associated
        Guacamole.OnScreenKeyboard.Key, whether that key is explicitly defined or
        implied, and may have multiple Guacamole.OnScreenKeyboard.Key if behavior
        depends on modifier states.
         * @param template - The object whose identically-named properties will be used to initialize
            the properties of this key.
         * @param [name] - The name to use instead of any name provided within the template, if
            any. If omitted, the name within the template will be used, assuming the
            template contains a name.
         */
        class Key {
            constructor(template: Guacamole.OnScreenKeyboard.Key | any, name?: string);
            /**
             * The unique name identifying this key within the keyboard layout.
             */
            name: string;
            /**
             * The human-readable title that will be displayed to the user within the
            key. If not provided, this will be derived from the key name.
             */
            title: string;
            /**
             * The keysym to be pressed/released when this key is pressed/released. If
            not provided, this will be derived from the title if the title is a
            single character.
             */
            keysym: number;
            /**
             * The name of the modifier set when the key is pressed and cleared when
            this key is released, if any. The names of modifiers are distinct from
            the names of keys; both the "RightShift" and "LeftShift" keys may set
            the "shift" modifier, for example. By default, the key will affect no
            modifiers.
             */
            modifier: string;
            /**
             * An array containing the names of each modifier required for this key to
            have an effect. For example, a lowercase letter may require nothing,
            while an uppercase letter would require "shift", assuming the Shift key
            is named "shift" within the layout. By default, the key will require
            no modifiers.
             */
            requires: String[];
        }
    }
    /**
     * Abstract stream which can receive data.
     * @param client - The client owning this stream.
     * @param index - The index of this stream.
     */
    class OutputStream {
        constructor(client: Guacamole.Client, index: number);
        /**
         * The index of this stream.
         */
        index: number;
        /**
         * Writes the given base64-encoded data to this stream as a blob.
         * @param data - The base64-encoded data to send.
         */
        sendBlob(data: string): void;
        /**
         * Closes this stream.
         */
        sendEnd(): void;
    }
    /**
     * Simple Guacamole protocol parser that invokes an oninstruction event when
    full instructions are available from data received via receive().
     */
    class Parser {
        /**
         * Appends the given instruction data packet to the internal buffer of
        this Guacamole.Parser, executing all completed instructions at
        the beginning of this buffer, if any.
         * @param packet - The instruction data to receive.
         */
        receive(packet: string): void;
    }
    /**
     * A description of the format of raw PCM audio, such as that used by
    Guacamole.RawAudioPlayer and Guacamole.RawAudioRecorder. This object
    describes the number of bytes per sample, the number of channels, and the
    overall sample rate.
     * @param template - The object whose properties should be copied into the corresponding
        properties of the new Guacamole.RawAudioFormat.
     */
    class RawAudioFormat {
        constructor(template: Guacamole.RawAudioFormat | any);
        /**
         * The number of bytes in each sample of audio data. This value is
        independent of the number of channels.
         */
        bytesPerSample: number;
        /**
         * The number of audio channels (ie: 1 for mono, 2 for stereo).
         */
        channels: number;
        /**
         * The number of samples per second, per channel.
         */
        rate: number;
        /**
         * Parses the given mimetype, returning a new Guacamole.RawAudioFormat
        which describes the type of raw audio data represented by that mimetype. If
        the mimetype is not a supported raw audio data mimetype, null is returned.
         * @param mimetype - The audio mimetype to parse.
         * @returns A new Guacamole.RawAudioFormat which describes the type of raw
            audio data represented by the given mimetype, or null if the given
            mimetype is not supported.
         */
        static parse(mimetype: string): Guacamole.RawAudioFormat;
    }
    /**
     * A recording of a Guacamole session. Given a {@link Guacamole.Tunnel}, the
    Guacamole.SessionRecording automatically handles incoming Guacamole
    instructions, storing them for playback. Playback of the recording may be
    controlled through function calls to the Guacamole.SessionRecording, even
    while the recording has not yet finished being created or downloaded.
     * @param tunnel - The Guacamole.Tunnel from which the instructions of the recording should
        be read.
     */
    class SessionRecording {
        constructor(tunnel: Guacamole.Tunnel);
        /**
         * Connects the underlying tunnel, beginning download of the Guacamole
        session. Playback of the Guacamole session cannot occur until at least
        one frame worth of instructions has been downloaded.
         * @param data - The data to send to the tunnel when connecting.
         */
        connect(data: string): void;
        /**
         * Disconnects the underlying tunnel, stopping further download of the
        Guacamole session.
         */
        disconnect(): void;
        /**
         * Returns the underlying display of the Guacamole.Client used by this
        Guacamole.SessionRecording for playback. The display contains an Element
        which can be added to the DOM, causing the display (and thus playback of
        the recording) to become visible.
         * @returns The underlying display of the Guacamole.Client used by this
            Guacamole.SessionRecording for playback.
         */
        getDisplay(): Guacamole.Display;
        /**
         * Returns whether playback is currently in progress.
         * @returns true if playback is currently in progress, false otherwise.
         */
        isPlaying(): boolean;
        /**
         * Returns the current playback position within the recording, in
        milliseconds, where zero is the start of the recording.
         * @returns The current playback position within the recording, in milliseconds.
         */
        getPosition(): number;
        /**
         * Returns the duration of this recording, in milliseconds. If the
        recording is still being downloaded, this value will gradually increase.
         * @returns The duration of this recording, in milliseconds.
         */
        getDuration(): number;
        /**
         * Begins continuous playback of the recording downloaded thus far.
        Playback of the recording will continue until pause() is invoked or
        until no further frames exist. Playback is initially paused when a
        Guacamole.SessionRecording is created, and must be explicitly started
        through a call to this function. If playback is already in progress,
        this function has no effect. If a seek operation is in progress,
        playback resumes at the current position, and the seek is aborted as if
        completed.
         */
        play(): void;
        /**
         * Seeks to the given position within the recording. If the recording is
        currently being played back, playback will continue after the seek is
        performed. If the recording is currently paused, playback will be
        paused after the seek is performed. If a seek operation is already in
        progress, that seek is first aborted. The seek operation will proceed
        asynchronously.
         * @param position - The position within the recording to seek to, in milliseconds.
         * @param [callback] - The callback to invoke once the seek operation has completed.
         */
        seek(position: number, callback?: (...params: any[]) => any): void;
        /**
         * Pauses playback of the recording, if playback is currently in progress.
        If playback is not in progress, this function has no effect. If a seek
        operation is in progress, the seek is aborted. Playback is initially
        paused when a Guacamole.SessionRecording is created, and must be
        explicitly started through a call to play().
         */
        pause(): void;
    }
    /**
     * A Guacamole status. Each Guacamole status consists of a status code, defined
    by the protocol, and an optional human-readable message, usually only
    included for debugging convenience.
     * @param code - The Guacamole status code, as defined by Guacamole.Status.Code.
     * @param [message] - An optional human-readable message.
     */
    class Status {
        constructor(code: number, message?: string);
        /**
         * The Guacamole status code.
         */
        code: number;
        /**
         * An arbitrary human-readable message associated with this status, if any.
        The human-readable message is not required, and is generally provided
        for debugging purposes only. For user feedback, it is better to translate
        the Guacamole status code into a message.
         */
        message: string;
        /**
         * Returns whether this status represents an error.
         * @returns true if this status represents an error, false
                           otherwise.
         */
        isError(): boolean;
        /**
         * Enumeration of all Guacamole status codes.
         */
        static Code: any;
    }
    /**
     * A reader which automatically handles the given input stream, returning
    strictly text data. Note that this object will overwrite any installed event
    handlers on the given Guacamole.InputStream.
     * @param stream - The stream that data will be read
                                          from.
     */
    class StringReader {
        constructor(stream: Guacamole.InputStream);
    }
    /**
     * A writer which automatically writes to the given output stream with text
    data.
     * @param stream - The stream that data will be written
                                           to.
     */
    class StringWriter {
        constructor(stream: Guacamole.OutputStream);
        /**
         * Sends the given text.
         * @param text - The text to send.
         */
        sendText(text: string): void;
        /**
         * Signals that no further text will be sent, effectively closing the
        stream.
         */
        sendEnd(): void;
    }
    /**
     * Core object providing abstract communication for Guacamole. This object
    is a null implementation whose functions do nothing. Guacamole applications
    should use {@link Guacamole.HTTPTunnel} instead, or implement their own tunnel based
    on this one.
     */
    class Tunnel {
        /**
         * Connect to the tunnel with the given optional data. This data is
        typically used for authentication. The format of data accepted is
        up to the tunnel implementation.
         * @param data - The data to send to the tunnel when connecting.
         */
        connect(data: string): void;
        /**
         * Disconnect from the tunnel.
         */
        disconnect(): void;
        /**
         * Send the given message through the tunnel to the service on the other
        side. All messages are guaranteed to be received in the order sent.
         * @param elements - The elements of the message to send to the service on the other side
            of the tunnel.
         */
        sendMessage(...elements: any[]): void;
        /**
         * Returns whether this tunnel is currently connected.
         * @returns true if this tunnel is currently connected, false otherwise.
         */
        isConnected(): boolean;
        /**
         * The current state of this tunnel.
         */
        state: number;
        /**
         * The maximum amount of time to wait for data to be received, in
        milliseconds. If data is not received within this amount of time,
        the tunnel is closed with an error. The default value is 15000.
         */
        receiveTimeout: number;
        /**
         * The amount of time to wait for data to be received before considering
        the connection to be unstable, in milliseconds. If data is not received
        within this amount of time, the tunnel status is updated to warn that
        the connection appears unresponsive and may close. The default value is
        1500.
         */
        unstableThreshold: number;
        /**
         * The UUID uniquely identifying this tunnel. If not yet known, this will
        be null.
         */
        uuid: string;
        /**
         * The Guacamole protocol instruction opcode reserved for arbitrary internal
        use by tunnel implementations. The value of this opcode is guaranteed to be
        the empty string (""). Tunnel implementations may use this opcode for any
        purpose. It is currently used by the HTTP tunnel to mark the end of the HTTP
        response, and by the WebSocket tunnel to transmit the tunnel UUID and send
        connection stability test pings/responses.
         */
        static readonly INTERNAL_DATA_OPCODE: string;
        /**
         * All possible tunnel states.
         */
        static State: any;
    }
    /**
     * Guacamole Tunnel implemented over HTTP via XMLHttpRequest.
     * @param tunnelURL - The URL of the HTTP tunneling service.
     * @param [crossDomain = false] - Whether tunnel requests will be cross-domain, and thus must use CORS
        mechanisms and headers. By default, it is assumed that tunnel requests
        will be made to the same domain.
     * @param [extraTunnelHeaders = {}] - Key value pairs containing the header names and values of any additional
        headers to be sent in tunnel requests. By default, no extra headers will
        be added.
     */
    class HTTPTunnel extends Guacamole.Tunnel {
        constructor(tunnelURL: string, crossDomain?: boolean, extraTunnelHeaders?: any);
        /**
         * Connect to the tunnel with the given optional data. This data is
        typically used for authentication. The format of data accepted is
        up to the tunnel implementation.
         * @param data - The data to send to the tunnel when connecting.
         */
        connect(data: string): void;
        /**
         * Disconnect from the tunnel.
         */
        disconnect(): void;
        /**
         * Send the given message through the tunnel to the service on the other
        side. All messages are guaranteed to be received in the order sent.
         * @param elements - The elements of the message to send to the service on the other side
            of the tunnel.
         */
        sendMessage(...elements: any[]): void;
    }
    /**
     * Guacamole Tunnel implemented over WebSocket via XMLHttpRequest.
     * @param tunnelURL - The URL of the WebSocket tunneling service.
     */
    class WebSocketTunnel extends Guacamole.Tunnel {
        constructor(tunnelURL: string);
        /**
         * Connect to the tunnel with the given optional data. This data is
        typically used for authentication. The format of data accepted is
        up to the tunnel implementation.
         * @param data - The data to send to the tunnel when connecting.
         */
        connect(data: string): void;
        /**
         * Disconnect from the tunnel.
         */
        disconnect(): void;
        /**
         * Send the given message through the tunnel to the service on the other
        side. All messages are guaranteed to be received in the order sent.
         * @param elements - The elements of the message to send to the service on the other side
            of the tunnel.
         */
        sendMessage(...elements: any[]): void;
    }
    /**
     * Guacamole Tunnel which cycles between all specified tunnels until
    no tunnels are left. Another tunnel is used if an error occurs but
    no instructions have been received. If an instruction has been
    received, or no tunnels remain, the error is passed directly out
    through the onerror handler (if defined).
     * @param tunnelChain - The tunnels to use, in order of priority.
     */
    class ChainedTunnel extends Guacamole.Tunnel {
        constructor(...tunnelChain: any[]);
        /**
         * Connect to the tunnel with the given optional data. This data is
        typically used for authentication. The format of data accepted is
        up to the tunnel implementation.
         * @param data - The data to send to the tunnel when connecting.
         */
        connect(data: string): void;
    }
    /**
     * Guacamole Tunnel which replays a Guacamole protocol dump from a static file
    received via HTTP. Instructions within the file are parsed and handled as
    quickly as possible, while the file is being downloaded.
     * @param url - The URL of a Guacamole protocol dump.
     * @param [crossDomain = false] - Whether tunnel requests will be cross-domain, and thus must use CORS
        mechanisms and headers. By default, it is assumed that tunnel requests
        will be made to the same domain.
     * @param [extraTunnelHeaders = {}] - Key value pairs containing the header names and values of any additional
        headers to be sent in tunnel requests. By default, no extra headers will
        be added.
     */
    class StaticHTTPTunnel extends Guacamole.Tunnel {
        constructor(url: string, crossDomain?: boolean, extraTunnelHeaders?: any);
        /**
         * Connect to the tunnel with the given optional data. This data is
        typically used for authentication. The format of data accepted is
        up to the tunnel implementation.
         * @param data - The data to send to the tunnel when connecting.
         */
        connect(data: string): void;
        /**
         * Disconnect from the tunnel.
         */
        disconnect(): void;
        /**
         * Send the given message through the tunnel to the service on the other
        side. All messages are guaranteed to be received in the order sent.
         * @param elements - The elements of the message to send to the service on the other side
            of the tunnel.
         */
        sendMessage(...elements: any[]): void;
    }
    /**
     * The unique ID of this version of the Guacamole JavaScript API. This ID will
    be the version string of the guacamole-common-js Maven project, and can be
    used in downstream applications as a sanity check that the proper version
    of the APIs is being used (in case an older version is cached, for example).
     */
    var API_VERSION: string;
    /**
     * Abstract video player which accepts, queues and plays back arbitrary video
    data. It is up to implementations of this class to provide some means of
    handling a provided Guacamole.InputStream and rendering the received data to
    the provided Guacamole.Display.VisibleLayer. Data received along the
    provided stream is to be played back immediately.
     */
    class VideoPlayer {
        /**
         * Notifies this Guacamole.VideoPlayer that all video up to the current
        point in time has been given via the underlying stream, and that any
        difference in time between queued video data and the current time can be
        considered latency.
         */
        sync(): void;
        /**
         * Determines whether the given mimetype is supported by any built-in
        implementation of Guacamole.VideoPlayer, and thus will be properly handled
        by Guacamole.VideoPlayer.getInstance().
         * @param mimetype - The mimetype to check.
         * @returns true if the given mimetype is supported by any built-in
            Guacamole.VideoPlayer, false otherwise.
         */
        static isSupportedType(mimetype: string): boolean;
        /**
         * Returns a list of all mimetypes supported by any built-in
        Guacamole.VideoPlayer, in rough order of priority. Beware that only the core
        mimetypes themselves will be listed. Any mimetype parameters, even required
        ones, will not be included in the list.
         * @returns A list of all mimetypes supported by any built-in Guacamole.VideoPlayer,
            excluding any parameters.
         */
        static getSupportedTypes(): String[];
        /**
         * Returns an instance of Guacamole.VideoPlayer providing support for the given
        video format. If support for the given video format is not available, null
        is returned.
         * @param stream - The Guacamole.InputStream to read video data from.
         * @param layer - The destination layer in which this Guacamole.VideoPlayer should play
            the received video data.
         * @param mimetype - The mimetype of the video data in the provided stream.
         * @returns A Guacamole.VideoPlayer instance supporting the given mimetype and
            reading from the given stream, or null if support for the given mimetype
            is absent.
         */
        static getInstance(stream: Guacamole.InputStream, layer: Guacamole.Display.VisibleLayer, mimetype: string): Guacamole.VideoPlayer;
    }
}
//}
