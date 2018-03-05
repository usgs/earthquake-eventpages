var colormap = {
    0: {'r': 255, 'g': 255, 'b': 255},
    1: {'r': 255, 'g': 255, 'b': 255},
    2: {'r': 191, 'g': 204, 'b': 255},
    3: {'r': 160, 'g': 230, 'b': 255},
    4: {'r': 128, 'g': 255, 'b': 255},
    5: {'r': 122, 'g': 255, 'b': 147},
    6: {'r': 255, 'g': 255, 'b': 0},
    7: {'r': 255, 'g': 200, 'b': 0},
    8: {'r': 255, 'g': 145, 'b': 0},
    9: {'r': 255, 'g': 0, 'b': 0},
    10: {'r': 200, 'g': 0, 'b': 0},
    13: {'r': 128, 'g': 0, 'b': 0},
}

export function getMmiRgba(mmi, opacity=1) {
    if (mmi === 'null') {
        mmi = .1
    }

    let low = Math.floor(mmi);
    let lowC = colormap[low];

    let high = low + 1;
    let highC = colormap[high];

    var colors = {'r': 0, 'g': 0, 'b': 0};
    for (let color in colors) {
        let cNum = (high - mmi) * highC[color] + 
                            (mmi - low) * lowC[color];

        colors[color] = Math.round(cNum);
    }

    return 'rgba(' + colors['r'] + ',' + 
                        colors['g'] + ',' + 
                        colors['b'] + ',' + 
                        opacity +')';
}

/*

DEFAULT COLOR MAP

0       255     255     255     1       255     255     255
1       255     255     255     2       191     204     255
2       191     204     255     3       160     230     255
3       160     230     255     4       128     255     255
4       128     255     255     5       122     255     147
5       122     255     147     6       255     255     0
6       255     255     0       7       255     200     0
7       255     200     0       8       255     145     0
8       255     145     0       9       255     0       0
9       255     0       0       10      200     0       0
#10      200     0       0       13      128     0       0

*/