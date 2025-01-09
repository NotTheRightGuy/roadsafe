export class FixedSizeArray<T> {
	size: number;
	start: number;
	data: T[];
	count: number;
	constructor(size: number) {
		if (size <= 0) {
			throw new Error("Size must be greater than 0");
		}
		this.size = size; // Maximum size of the array
		this.data = new Array<T>(size); // Internal array to hold the elements
		this.start = 0; // Start index for the circular buffer
		this.count = 0; // Current number of elements in the array
	}

	add(element: T) {
		// Add the new element to the array, overwriting the oldest element if full
		const index = (this.start + this.count) % this.size;
		this.data[index] = element;

		if (this.count < this.size) {
			this.count++; // Increment count if the array is not full
		} else {
			this.start = (this.start + 1) % this.size; // Update the start index when overwriting
		}
	}

	getAll() {
		// Return the elements in the correct order (from oldest to newest)
		const result: T[] = [];
		for (let i = 0; i < this.count; i++) {
			result.push(this.data[(this.start + i) % this.size]);
		}
		return result;
	}
}