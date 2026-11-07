import "./ActivityIcon.css"
import useWindowWidth from "@/hooks/useWindowWidth.js"

export default function ActivityStatus({ auth, user }) {
    const width = useWindowWidth()

    return (
        <div className="ActivityCont">
            {auth && width >= 800 && (
                <div className="WelCont">
                    <p>{user}</p>
                </div>
            )}
            <div className="Activity">
                {auth && <div className="greenDot" />}
            </div>
        </div>
    )
}
