import Image from "next/image";

function CheckoutPage() {
  return (
    <div className="bg-gray-100 min-h-screen font-poppins">

      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">How would you like to get your order?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Customs regulation for India requires a copy of the recipient&apos;s KYC...{" "}
              <a href="#" className="text-blue-500 underline">Learn More</a>
            </p>

            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input type="radio" name="delivery-method" className="form-radio" />
                <span>Deliver it</span>
              </label>
            </div>

            <form>
              <h3 className="text-lg font-semibold mb-4">Enter your name and address:</h3>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="First Name" className="input w-full" />
                <input type="text" placeholder="Last Name" className="input w-full" />
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Address Line 1" className="input w-full" />
                <input type="text" placeholder="Address Line 2" className="input w-full" />
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Postal Code" className="input w-full" />
                <input type="text" placeholder="Locality" className="input w-full" />
              </div>
              <div className="mb-4">
                <select className="input w-full">
                  <option>State/Territory</option>
                  <option>India</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 mb-6">
                <input type="checkbox" id="save-address" className="form-checkbox" />
                <label htmlFor="save-address">Save this address to my profile</label>
              </div>

              <h3 className="text-lg font-semibold mb-4">What&apos;s your contact information?</h3>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="email" placeholder="Email" className="input w-full" />
                <input type="tel" placeholder="Phone Number" className="input w-full" />
              </div>
              <h3 className="text-lg font-semibold mb-4">What&apos;s your PAN?</h3>
              <input type="text" placeholder="PAN" className="input w-full mb-4" />
              <div className="flex items-center space-x-2 mb-6">
                <input type="checkbox" id="save-pan" className="form-checkbox" />
                <label htmlFor="save-pan">Save PAN details to the profile</label>
              </div>

              <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                Continue
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Order Summary</h2>
            <div className="mb-6">
              <p className="text-sm sm:text-base">Subtotal: <span className="font-bold">₹ 20,890.00</span></p>
              <p className="text-sm sm:text-base">Delivery/Shipping: <span className="font-bold">Free</span></p>
              <p className="text-sm sm:text-base">Total: <span className="font-bold">₹ 20,890.00</span></p>
              <small className="text-gray-500">
                (The total reflects the price of your order, including duties and taxes.)
              </small>
            </div>
            <div>
              <p className="text-gray-600 mb-4">Arrives Mon, 27 Mar - Wed, 12 Apr</p>
              <div className="flex items-center mb-4">
                <Image src={'/featured/shoe10.png'} alt="Product Image" width={60} height={60} className="rounded-md" />
                <p className="ml-4 text-sm">Nike Dri-FIT ADV TechKnit Ultra Men&apos;s Short-Sleeve Running Top</p>
              </div>
              <div className="flex items-center">
                <Image src={'/featured/shoe9.png'} alt="Product Image" width={60} height={60} className="rounded-md" />
                <p className="ml-4 text-sm">Nike Air Max 97 SE Men&apos;s Shoes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;