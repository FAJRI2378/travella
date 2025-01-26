"use client";

// import LoginModal from "../";
// import RegisterModal from "@/components/modal/RegisterModal";
// import RentModal from "@/components/modal/RentModal";
// import SearchModal from "@/components/modal/SearchModal";

import LoginModal from "@/app/components/modal/LoginModal";
import RegisterModal from "@/app/components/modal/RegisterModal";
import RentModal from "../components/modal/RentModal";

const modalProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <RentModal/>
      {/*<SearchModal />*/}
      {/*<RentModal />*/}
    </>
  );
};

export default modalProvider;
