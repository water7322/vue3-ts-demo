import { effect, track, trigger } from './effect.js';

export function computed(getterOrOptions) {
    let getter, setter;
    if (typeof getterOrOptions === 'function') {
        getter = getterOrOptions;
        setter = () => {
            console.warn('Write operation failed: computed value is readonly');
        };
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
}

class ComputedRefImpl {
    constructor(getter, setter) {
        this._setter = setter;
        this._val = undefined;
        this._dirty = true;
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) {
                    this._dirty = true;
                    trigger(this._dirty, 'value');
                }
            }
        });
    }
    get value() {
        track(this, 'value');
        if (this._dirty) {
            this._dirty = false;
            this._val = this.effect();
        }
        return this._val;
    }
    set value(val) {
        this._setter(val);
    }
}
