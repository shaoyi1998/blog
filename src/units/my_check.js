function generateSecret(original_jwt) {
    const [header, payload, signature] = original_jwt.split(".");

    // 将Header、Payload和Signature分别转换为数值
    const header_numeric = [...header].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const payload_numeric = [...payload].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const signature_numeric = [...signature].reduce((sum, char) => sum + char.charCodeAt(0), 0);

    // 计算密钥
    return String(header_numeric ^ (payload_numeric * signature_numeric));
}

export {
    generateSecret
}
