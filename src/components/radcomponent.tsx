
import { Banner } from "exoclick-react";



const AdComponent = () => {
    // useEffect(() => {
    //     // Create the script element
    //     const script1 = document.createElement("script");
    //     script1.src = "https://a.magsrv.com/ad-provider.js";
    //     script1.async = true;
    //     script1.type = "application/javascript";

    //     // Append the script to the document head
    //     document.head.appendChild(script1);

    //     // Initialize the ad after the script has loaded
    //     script1.onload = () => {
    //         //@ts-ignore
    //         (window.AdProvider = window.AdProvider || []).push({ serve: {} });
    //     };

    //     // Clean up: Remove the script when the component unmounts
    //     return () => {
    //         document.head.removeChild(script1);
    //     };
    // }, []);

    return (
        <div>
            {/* Ad placeholder */}
            <Banner zoneId={5395928} />
        </div>
    );
};

export default AdComponent;
