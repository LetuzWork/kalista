import GroupCard from "./groupCard";

export default function Main (props){
    return(<div id="main">{
        props.groups.map(g => <GroupCard g={g}/>)}</div>
    );
}