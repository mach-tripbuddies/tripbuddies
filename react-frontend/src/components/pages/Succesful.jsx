import FooterFour from "@/components/layout/footers/FooterFour";
import Header3 from "@/components/layout/header/Header3";
import { useNavigate } from 'react-router-dom';
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
    title: "Trip Planner |  Machathon | Valtech",
    description: "Trip Planner for all",
};

export default function Succesful() {
    const navigateTo = useNavigate();
    const handleSubmit = (values) => {
        values.preventDefault();
        navigateTo('/home');
    };
    return (
        <>
            <MetaComponent meta={metadata} />
            <main>
                <Header3/>
                <section className="nopage mt-header">
                    <div className="container">
                        <div className="row y-gap-30 justify-between items-center">
                            <div className="col-xl-12 col-lg-12 items-center">
                                <div className="nopage__content pr-30 lg:pr-0">
                                    <img src="/img/check.png" alt="image" />
                                    <h2 className="text-40">
                                        Payment Sucessful
                                    </h2>
                                    <p>
                                        The trip you booked is successful
                                    </p>

                                    <button className="button -md -dark-1 bg-accent-1 text-white mt-25" type="submit" onClick={handleSubmit}>
                                        Go back to homepage
                                        <i className="icon-arrow-top-right ml-10"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterFour />
            </main>
        </>
    );
}