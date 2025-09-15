import Auth from "@components/dashboard/auth";

export default async function Page() {
    return(
        <div id="page-auth" className="slide-up duration-500">
            <Auth/>
        </div>
    )
}