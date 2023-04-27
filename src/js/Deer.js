class Deer {
    constructor(data) {
        Object.assign(this, data)
    }

    getDeerHtml() {
        const { name, age, bio } = this;
        return `
            <figcaption class="bio">
                <h2>${name}, ${age}</h3>
                <p>${bio}</p>
            </figcaption>
        `
    }
}

export default Deer