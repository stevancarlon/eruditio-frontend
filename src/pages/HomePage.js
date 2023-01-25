import AnimatedPage from "../components/AnimatedPage";
import classes from "./HomePage.module.css";
import homepageImg from "../assets/homepage.png";
import Button from "../components/Button";
import Library from "../components/Library";
import { Link as ScrollLink } from "react-scroll";

const HomePage = () => {

    return (
        <AnimatedPage>
            <main>
                <div className={classes.main}>
                    <div className={classes.exploreText}>
                        <h1>Explore the library</h1>
                        <p>
                            We reunited more than 10,000 classic books from all
                            over the world. From Newton, Leibniz, Aristotle to
                            Fernando Pessoa, Machado de Assis and much more!
                        </p>
                        <ScrollLink
                            to="library"
                            smooth={true}
                            spy={true}
                            offset={0}
                            duration={500}
                            debug="true"
                            
                        >
                        
                            <Button btnText="See more" />
                        </ScrollLink>
                    </div>
                    <img
                        src={homepageImg}
                        className={classes.homepageImg}
                        alt="library"
                    ></img>
                </div>
                
                    <Library />
            </main>
        </AnimatedPage>
    );
};

export default HomePage;
