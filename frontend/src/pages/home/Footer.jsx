import {Link} from "react-router-dom"
function Footer() {
  return (
    <>
      <div className="mt-4 bg-primary-light flex  items-center p-6  lg:gap-16 gap-8">
        <h1 className=" text-secondary font-bold lg:text-3xl md:text-xl text-lg">Marketly</h1>
        <div className=" w-[3px] bg-secondary lg:h-10 h-8"></div>
        <img src="assets/logo-small-dark-bg.svg" alt="Marketly" className="  h-8" />
      </div>
      <section className=" flex justify-around flex-wrap md:flex-row flex-col p-10 ">

      <div className="flex flex-col">
        <h1  className="lg:mb-4 mt-4 lg:mt-0 mb-1">useful links</h1>
          <Link className="text-primary-light" href={""} >Explorer</Link>
          <Link className="text-primary-light" href={""} >Search</Link>
      </div>
      <div className="flex flex-col">
        <h1 className="lg:mb-4 mt-4 lg:mt-0 mb-1 ">About us</h1>
          <Link className="text-primary-light" href={""} >About Marketly</Link>
          <Link className="text-primary-light" href={""} >About Team</Link>
          <Link className="text-primary-light" href={""} >Marketly careers</Link>
      </div>
      <div className="flex flex-col">
        <h1 className="lg:mb-4 mt-4 lg:mt-0 mb-1">sell on marketly</h1>
        <Link className="text-primary-light" href={""} >switch to seller</Link>
        <Link className="text-primary-light" href={""} >seller dashboard</Link>

      </div>
      </section>
     <footer className="bg-black  text-white px-16 md:gap-12 gap-4 text-sm  p-4  flex justify-around md:p-4 ">
      <h1 className="flex-1 text-nowrap">Contact us</h1>
      <h1 className=" text-nowrap">Term of use </h1>
      <h1 className="text-nowrap">Privacy Policy</h1>
     </footer>

    </>
  );
}

export default Footer;
