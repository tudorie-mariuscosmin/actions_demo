function applyDiscount(vehicles, discount) {
    return new Promise((resolve, reject) => {

        if (!isNaN(discount)) {
            if (Array.isArray(vehicles)) {
                let minPrice = vehicles[0].price

                vehicles.forEach(vehicle => {
                    if (typeof vehicle.make === "string" && typeof vehicle.price === "number") {
                        if (vehicle.price < minPrice) {
                            minPrice = vehicle.price
                        }
                    } else {
                        reject(new Error("Invalid array format"))
                    }

                })
                if (discount > (minPrice * 0.5)) {
                    reject("Discount too big")
                } else {
                    let newArray = []
                    for (let i = 0; i < vehicles.length; i++) {
                        // console.log("pret", vehicles[i].price)
                        // console.log("discount", discount)
                        // console.log("result", vehicles[i].price -= discount)

                        let price = vehicles[i].price - discount
                        let make = vehicles[i].make
                        let obj = { make, price }
                        newArray.push(obj)
                    }
                    console.log(newArray)
                    resolve(newArray)
                }
            } else {
                reject(new Error("Invalid array format"))
            }
        } else {
            reject(new Error("Invalid discount"))
        }



    })
}

const app = {
    applyDiscount: applyDiscount
};

module.exports = app;