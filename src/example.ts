import { cyan, green, magenta, red, yellow } from 'chalk';
import { base64Decode, base64Encode, decrypt, decryptObject, encrypt, encryptObject, isEqual } from './crypt';

export const cryptExample: (v: string, key: string) => Promise<void> = async (v: string, key: string): Promise<void> => {
    const printHeader = (title: string) => {
        console.log(red.bold('\n================================================='));
        console.log(magenta.bold(`✨ ${title}`));
        console.log(red.bold('=================================================\n'));
    };

    const printSection = (title: string) => console.log(cyan.bold(`\n🔍 ${title}:`));

    const logObject = (label: string, obj: any) => {
        console.log(`${green.bold(`➤ ${label}:`)}\n${yellow.bold(JSON.stringify(obj, null, 2))}`);
    };

    printHeader('Cryptography Example');

    const E = encrypt(v, { key }) as string;
    const D: string = decrypt(E, { key });
    const eq: boolean = isEqual(E, D, { key }).isEqual;

    const be: string = base64Encode(v, key);
    const bd: string = base64Decode(be, key);

    printSection('Simple Encryption/Decryption');
    console.log(`${green.bold('➤ Encrypted Value:')} ${yellow.bold(E)}`);
    console.log(`${green.bold('➤ Decrypted Value:')} ${yellow.bold(D)}`);
    console.log(`${green.bold('➤ Are They Equal?')} ${eq ? yellow.bold('Yes ✅') : red.bold('No ❌')}`);

    printSection('Base64 Encoding/Decoding');
    console.log(`${green.bold('➤ Base64 Encoded:')} ${yellow.bold(be)}`);
    console.log(`${green.bold('➤ Base64 Decoded:')} ${yellow.bold(bd)}`);

    const originalData = {
        username: 'JohnDoe',
        email: 'john@example.com',
        role: 'admin',
        age: 30,
        address: {
            street: '123 Main St',
            city: 'Exampleville',
            zipCode: '12',
            nested: { a: 'a', b: 'b', c: { d: 'd' } },
        },
        permissions: ['read', 'write', { admin: true }],
        settings: [
            { theme: 'dark', notifications: true },
            'simpleString',
            [42, { deepKey: 'deepValue' }]
        ],
    };

    const secretKey = 'my-secret-key-2023';
    const encryptedData = await encryptObject(originalData, secretKey);
    const decryptedData = await decryptObject(encryptedData, secretKey);

    printSection('Original Object');
    logObject('Original Data', originalData);

    printSection('Encrypted Object');
    logObject('Encrypted Data', encryptedData);

    printSection('Decrypted Object');
    logObject('Decrypted Data', decryptedData);

    // Validate Equality for Complex Objects
    printSection('Validation');
    console.log(`${green.bold('➤ Is Decrypted Data Equal to Original?')} ${JSON.stringify(originalData) === JSON.stringify(decryptedData) ? yellow.bold('Yes ✅') : red.bold('No ❌')
        }`);

    printHeader('Cryptography Example Completed');
};