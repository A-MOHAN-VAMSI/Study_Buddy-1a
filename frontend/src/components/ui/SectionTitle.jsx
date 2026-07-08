export default function SectionTitle({

title,

subtitle

}){

return(

<div
style={{marginBottom:"28px"}}
>

<h2
style={{
fontSize:"34px",
fontWeight:700
}}
>

{title}

</h2>

<p
style={{
color:"#9ca3af",
marginTop:"8px"
}}
>

{subtitle}

</p>

</div>

)

}