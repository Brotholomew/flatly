export interface GlobalFooterProps {
    expanded: boolean
}

const GlobalFooter = (props: GlobalFooterProps) => {
    let upper;
    if (props.expanded)
        upper =
            <div className={'footer-component upper'}>
                <div className={'footer-subcomponent left'} >
                    <h1> Flatly </h1>
                    <h4>Flats</h4>
                    <h4>Bookings</h4>
                </div>
                <div className={'separator separator-vertical'} />
                <div className={'footer-subcomponent right'} >
                    <h3> The Flatly Team </h3>
                    <p>00-000 Warsaw</p>
                    <p>ul. Koszykowa 75a</p>
                    <p>tel: 888 888 888</p>
                    <p><a href={"mailto:helpdesk@flatly.com"}>helpdesk@flatly.com</a></p>
                </div>
            </div>;

    return (
        <div className={'footer'}>
            { upper }
            <div className={'footer-component lower'} >
                <div className={'footer-subcomponent left'} >
                    <p> Copyright {new Date().getFullYear()} </p>
                </div>
                <div className={'separator separator-vertical'} />
                <div className={'footer-subcomponent right'} >
                    <p> The Flatly Team </p>
                </div>
            </div>
        </div>
    );
}

export default GlobalFooter;