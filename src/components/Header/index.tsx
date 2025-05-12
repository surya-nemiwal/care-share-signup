import ImageWithSkeleton from "../ImageWithSkeleton";
import styles from "./styles.module.css";
const Header = () => {
  return (
    <header
      className={`px-4 pt-6 pb-2 z-[100] bg-grey-1 w-full flex justify-start fixed top-0 lg:right-0 lg:w-1/2`}
    >
      <ImageWithSkeleton
        src="/images/logo.png"
        alt="logo"
        className={styles.logo}
        imgClassName="object-contain"
        priority={true}
      />
    </header>
  );
};

export default Header;
