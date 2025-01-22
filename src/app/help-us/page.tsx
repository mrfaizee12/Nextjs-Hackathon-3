import { ImMobile } from "react-icons/im";
import { RiMessage2Fill } from "react-icons/ri";
import { MdEmail, MdEditLocation } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

export default function HelpUs() {
  return (
    <div className="bg-white min-h-screen p-6">
      {/* Centered Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">GET HELP</h1>
        <div className="relative mt-4 w-full max-w-md mx-auto">
          <IoIosSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="What can we help you with?"
            className="w-full border border-gray-300 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?</h2>
          <p>
            We want to make buying your favourite Nike shoes and gear online fast and easy, and we accept the following payment options:
          </p>
          <p className="font-semibold">Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</p>
          <p>
            {`If you enter your PAN information at checkout, you'll be able to pay for your order with PayTM or a local credit or debit card.`}
          </p>
          <p className="font-semibold">Apple Pay</p>
          <p>
            {`Nike Members can store multiple debit or credit cards in their profile for faster checkout. If you're not already a Member, join us today.`}
          </p>
          <div className="flex space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-full">JOIN US</button>
            <button className="bg-black text-white px-4 py-2 rounded-full">SHOP NIKE</button>
          </div>

          {/* FAQs Section */}
          <h2 className="text-xl font-bold mt-8">FAQs</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Does my card need international purchases enabled?</p>
              <p>
                Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled.
              </p>
              <p>Please note, some banks may charge a small transaction fee for international orders.</p>
            </div>
            <div>
              <p className="font-semibold">Can I pay for my order with multiple methods?</p>
              <p>{`No, payment for Nike orders can't be split between multiple payment methods.`}</p>
            </div>
            <div>
              <p className="font-semibold">What payment method is accepted for SNKRS orders?</p>
              <p>You can use any accepted credit card to pay for your SNKRS order.</p>
            </div>
            <div>
              <p className="font-semibold">{`Why don't I see Apple Pay as an option?`}</p>
              <p>
                {`To see Apple Pay as an option in the Nike App or on Nike.com, you'll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally, you'll need to use Safari to use Apple Pay on Nike.com.`}
              </p>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="flex items-center space-x-4 mt-6">
            <span>Was this answer helpful?</span>
            <button className="text-xl">
              <BiSolidLike />
            </button>
            <button className="text-xl">
              <BiSolidDislike />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-xl font-bold mb-6">CONTACT US</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <ImMobile className="text-2xl text-black" />
              <div>
                <p>080 000 919 0566</p>
                <p>Products & Orders: 24 hours a day, 7 days a week</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <RiMessage2Fill className="text-2xl text-black" />
              <div>
                <p>{`We'll reply within five business days.`}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MdEmail className="text-2xl text-black" />
              <div>
                <p>Email Us</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MdEditLocation className="text-2xl text-black" />
              <div>
                <p>Store Locator</p>
                <p>Find Nike retail stores near you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}