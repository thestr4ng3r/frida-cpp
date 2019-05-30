
// std::vector of MSVC 120 (2013)

/*
pointer _Myfirst;	// pointer to beginning of array
pointer _Mylast;	// pointer to current end of sequence
pointer _Myend;		// pointer to end of array
*/

export default class StdVector {
	constructor(addr, options) {
		this.addr = addr;
		this.elementSize = options.elementSize ? options.elementSize : Process.pointerSize;
		this.introspectElement = options.introspectElement;
	}

	get myfirst() {
		return this.addr.readPointer();
	}

	get mylast() {
		return this.addr.add(Process.pointerSize).readPointer();
	}

	get myend() {
		return this.addr.add(2 * Process.pointerSize).readPointer();
	}

	get size() {
		const myfirst = this.myfirst;
		if(myfirst.isNull()) {
			return 0;
		}
		const delta = this.mylast.sub(myfirst);
		return delta.toInt32() / this.elementSize;
	}

	toString() {
		let r = "std::vector(" + this.myfirst + ", " + this.mylast + ", " + this.myend + ")";
		r += "{ count: " + this.size;
		if(this.introspectElement) {
			r += ", content: [";
			const last = this.mylast;
			for(var p = this.myfirst; p.compare(last) < 0; p = p.add(this.elementSize)) {
				r += this.introspectElement(p);
			}
			r += "]";
		}
		r += " }";
		return r;
	}

}
