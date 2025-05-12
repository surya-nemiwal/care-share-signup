import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import RegistrationForm from "@/components/RegistrationForm";
import styles from "./styles.module.css";

const SignupPage = () => {
  return (
    <div
      className={`w-full h-full min-h-screen min-w-full bg-grey-1 ${styles["signup-page"]}`}
    >
      <div className={styles["signup-banner-container"]}>
        <ImageWithSkeleton
          src="/images/signup-banner.png"
          imgClassName={styles["signup-banner"]}
          className="w-full h-full rounded-md"
        />
      </div>
      <RegistrationForm />
    </div>
  );
};

export default SignupPage;
