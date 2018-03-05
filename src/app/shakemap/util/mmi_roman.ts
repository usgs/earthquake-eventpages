export function getRomanFromMmi(mmiIn: number) {
    let mmi;
    switch (Math.round(Number(mmiIn))) {
        case 1: {
            mmi = 'I';
            break;
        }
        case 2: {
            mmi = 'II';
            break;
        }
        case 3: {
            mmi = 'III';
            break;
        }
        case 4: {
            mmi = 'IV';
            break;
        }
        case 5: {
            mmi = 'V';
            break;
        }
        case 6: {
            mmi = 'VI';
            break;
        }
        case 7: {
            mmi = 'VII';
            break;
        }
        case 8: {
            mmi = 'VIII';
            break;
        }
        case 9: {
            mmi = 'IX';
            break;
        }
        case 10: {
            mmi = 'X';
            break;
        }
        case 11: {
            mmi = 'XI';
            break;
        }
        case 12: {
            mmi = 'XII';
            break;
        }
        default: {
            mmi = '0';
        }
    }

    return mmi;
}