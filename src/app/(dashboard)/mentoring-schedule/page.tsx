import MentoringSchedule from "@components/dashboard/mentoring-schedule";

export default async function Page() {
    return(
        <div id="mentoring-schedule" className="slide-up duration-500">
            <MentoringSchedule/>
        </div>
    )
}