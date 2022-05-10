import Image from "next/image";
import Link from "next/link";
import github from "../images/github_icon.png";
import twitter from "../images/twitter_icon.png";
import tweeps from "../images/TweepsBook.png";

const Navbar = () => {
  return (
    <header className="border-b-2 border-lg-gray drop-shadow-md">
      <div className="md:mx-12 my-4 flex align-middle">
        <div className="self-center md:ml-10 ml-6">
          <Image
            src={tweeps}
            alt="Picture of the author"
            width={20}
            height={35}
          />
        </div>
        <div className="flex font-semibold text-center text-dark-blue text-base flex-auto justify-center">
          <div className="mx-8 self-center hidden lg:block">
            <Link href="/">Public Pages</Link>
          </div>
          <div className="mx-8 self-center hidden lg:block">
            <Link href="/">Wall of Love</Link>
          </div>
          <div className="mx-8 self-center hidden lg:block">
            <Link href="/">Usage Guide</Link>
          </div>
          <div className="mx-8 self-center hidden lg:block">
            <Link href="/">Privacy</Link>
          </div>
          <div className="mx-8 self-center hidden lg:block">
            <Link href="/">Terms</Link>
          </div>
        </div>
        <div className="flex md:mr-10 mr-6">
          <div className="mr-3">
            <a href="https://twitter.com/tweepsbookcom" target="_blank">
              <Image
                src={twitter}
                alt="Picture of the author"
                width={30}
                height={30}
              />
            </a>
          </div>
          <div>
            <a href="https://github.com/bigansh/tweepsbook" target="_blank">
              <Image
                src={github}
                alt="Picture of the author"
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
