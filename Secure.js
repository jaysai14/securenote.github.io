window.addEventListener('DOMContentLoaded', function() {
    var createLinkBtn = document.getElementById('createLinkBtn');
    var sendEmailBtn = document.getElementById('sendEmailBtn');
    var noteContent = document.getElementById('noteContent');
    var noteLinkContainer = document.getElementById('noteLinkContainer');
    var noteLink = document.getElementById('noteLink');

    createLinkBtn.addEventListener('click', function() {
        var note = noteContent.value;
        var encryptedNote = btoa(note); // Simple base64 encoding, NOT secure encryption

        var url = window.location.href + '?note=' + encodeURIComponent(encryptedNote);
        noteLink.href = url;
        noteLink.innerText = url;

        noteContent.value = '';
        noteLinkContainer.style.display = 'block';
    });

    sendEmailBtn.addEventListener('click', function() {
        var note = noteContent.value;
        var subject = 'Secure Note';
        var body = note;

        var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        window.location.href = mailtoLink;
    });

    // Check if a note is specified in the URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var noteParam = urlParams.get('note');
    if (noteParam) {
        var decryptedNote = atob(noteParam); // Simple base64 decoding, NOT secure decryption

        // Display the note content
        var noteViewer = document.createElement('div');
        noteViewer.innerText = decryptedNote;
        document.body.appendChild(noteViewer);

        // Remove the note after a delay (e.g., 10 seconds)
        setTimeout(function() {
            noteViewer.remove();
        }, 10000);
    }
});
