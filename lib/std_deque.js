
// std::deque of MSVC 120 (2013)

/*
_Container_proxy *_Myproxy; // from _Container_base12

_Mapptr _Map;		// pointer to array of pointers to blocks
size_type _Mapsize;	// size of map array, zero or 2^N
size_type _Myoff;	// offset of initial element
size_type _Mysize;	// current length of sequence


#define _DEQUESIZ	(sizeof (value_type) <= 1 ? 16 \
					: sizeof (value_type) <= 2 ? 8 \
					: sizeof (value_type) <= 4 ? 4 \
					: sizeof (value_type) <= 8 ? 2 \
					: 1)	// elements per block (a power of 2)
*/

export default class StdDeque {
	constructor(addr, valueSize) {
		this.addr = addr;
		this.valueSize = valueSize;
	}

	get DEQUESIZ() {
		return this.valueSize <= 1 ? 16
			: this.valueSize <= 2 ? 8
			: this.valueSize <= 4 ? 4
			: this.valueSize <= 8 ? 2
			: 1;
	}

	get containerProxy() {
		return this.addr.readPointer();
	}

	get map() {
		return this.addr.add(Process.pointerSize).readPointer();
	}

	get mapsize() {
		return this.addr.add(Process.pointerSize * 2).readPointer();
	}

	get myoff() {
		return this.addr.add(Process.pointerSize * 3).readPointer();
	}

	get mysize() {
		return this.addr.add(Process.pointerSize * 4).readPointer();
	}

	get contents() {
		const r = [];
		const DEQUESIZ = this.DEQUESIZ;
		const map = this.map;
		for(let i=0; i<this.mysize; i++) {
			const blockIndex = Math.floor(i / DEQUESIZ);
			const off = i % DEQUESIZ;
			const blockAddr = map.add(Process.pointerSize * blockIndex).readPointer();
			const elem = blockAddr.add(Process.pointerSize * off).readPointer();
			r.push(elem);
		}
		return r;
	}

	toString() {
			return "deque@" + this.addr
				+ "{ map=" + this.map
				+ ", offset=" + this.myoff
				+ ", size=" + this.mysize
				+ ", contents: " + this.contents + "}";
	}
}
