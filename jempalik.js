const originalInput = document.getElementById('original');
const flippedOutput = document.getElementById('i');
const charCount = document.getElementById('charCount');
const toast = document.getElementById('toast');

function flip() {
    const source = (originalInput?.value || '').toLowerCase();
    const result = flipString(source);

    if (flippedOutput) {
        flippedOutput.value = result;
    }
    updateCharCount(source.length);
}

function flipString(aString) {
    const last = aString.length - 1;
    const result = new Array(aString.length);
    for (let i = last; i >= 0; --i) {
        const c = aString.charAt(i);
        const r = flipTable[c];
        result[last - i] = r !== undefined ? r : c;
    }
    return result.join('');
}

const flipTable = {
    a: '\u0250',
    b: 'q',
    c: '\u0254',
    d: 'p',
    e: '\u01DD',
    f: '\u025F',
    g: '\u0183',
    h: '\u0265',
    i: '\u0131',
    j: '\u027E',
    k: '\u029E',
    l: '\u05DF',
    m: '\u026F',
    n: 'u',
    r: '\u0279',
    t: '\u0287',
    v: '\u028C',
    w: '\u028D',
    y: '\u028E',
    '.': '\u02D9',
    '[': ']',
    '(': ')',
    '{': '}',
    '?': '\u00BF',
    '!': '\u00A1',
    "'": ',',
    '<': '>',
    '_': '\u203E',
    '"': '\u201E',
    '\\': '\\',
    ';': '\u061B',
    '\u203F': '\u2040',
    '\u2045': '\u2046',
    '\u2234': '\u2235'
};

for (const key in flipTable) {
    flipTable[flipTable[key]] = key;
}

function clearText() {
    if (originalInput) {
        originalInput.value = '';
        originalInput.focus();
    }
    if (flippedOutput) {
        flippedOutput.value = '';
    }
    updateCharCount(0);
}

function copyFlipped() {
    const text = flippedOutput?.value || '';
    if (!text) return;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(showToast);
    } else {
        SelectAll('i');
        document.execCommand('copy');
        showToast();
    }
}

function showToast() {
    if (!toast) return;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 1400);
}

function updateCharCount(count) {
    if (charCount) {
        charCount.textContent = `${count} karakter`;
    }
}

function SelectAll(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.focus();
    el.select();
}

if (originalInput) {
    originalInput.focus();
}
