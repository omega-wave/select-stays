import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
    return (
        <footer className="border-t py-10 bg-[#1e3a5f] text-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Image
                            src="https://selectstays.in/wp-content/uploads/2025/02/cropped-Logo_Final-18-1.png"
                            alt="Select Stays Logo"
                            width={140}
                            height={32}
                            priority
                            className="mb-4"
                        />
                        <p className="text-sm text-gray-300 mt-4">
                            Select Stays curates exceptional homes, ensuring unforgettable stays for guests and seamless property management
                            for homeowners. Every property is handpicked for quality.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4">Know More</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about-us" className="text-gray-300 hover:text-white text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore-stays" className="text-gray-300 hover:text-white text-sm">
                                    Explore Stays
                                </Link>
                            </li>
                            <li>
                                <Link href="/list-property" className="text-gray-300 hover:text-white text-sm">
                                    List Your Property
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="text-gray-300 hover:text-white text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4">Explore Stays</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/villas-in-goa" className="text-gray-300 hover:text-white text-sm">
                                    Villas in Goa
                                </Link>
                            </li>
                            <li>
                                <Link href="/apartments-india" className="text-gray-300 hover:text-white text-sm">
                                    Apartments in India
                                </Link>
                            </li>
                            <li>
                                <Link href="/studios-in-goa" className="text-gray-300 hover:text-white text-sm">
                                    Studios in Goa
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4">Contact Us</h3>
                        <p className="text-gray-300 text-sm">Email: info@selectstays.in</p>
                        <p className="text-gray-300 text-sm mt-2">Phone: +91 98765 43210</p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Select Stays. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}
