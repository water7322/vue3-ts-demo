import { isObject } from './shared.js';
import { reactive } from './index.js';
import { track, trigger } from './effect.js';

export function ref(val) {
    if (isRef(val)) {
        return val;
    }
    return new RefImpl(val);
}

function isRef(val) {
    return !!val?.__isRef;
}

class RefImpl {
    constructor(val) {
        this.__isRef = true;
        this._val = convert(val);
    }
    get value() {
        track(this, 'value');
        return this._val;
    }
    set value(val) {
        if (val !== this._val) {
            this._val = convert(val);
            trigger(this, 'value');
        }
    }
}

function convert(val) {
    return isObject(val) ? reactive(val) : val;
}
