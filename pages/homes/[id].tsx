import { useState, useCallback } from 'react';
import { returnSingleHome } from "../../utils/fetchSingleHome";
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import styles from '../../styles/HomeId.module.css'
import format from 'date-fns/format'
import { type H } from '../../utils/houseType';
import DescriptionBox from "../../components/DescriptionBox";
import ImgView from '../../components/ImageViewer';
import Image from 'next/image';



const HomeInfo = ({ property }: any) => {
    console.log(property)
    const home: H = property;
    
    const [imgClicked, setImgClicked] = useState(false);
    

    const openImgView = useCallback(()=>{
        setImgClicked(true);
        //setCurrentImage(0);
    }, []);

    return (
        <div style={{height: '100%'}}>
            <Head>
                <title>{home.ListingId}</title>
            </Head>
            <div className={styles.homeDiv}>
                <div className={styles.titleDiv}>
                    <div className={styles.addressDiv}>
                       <div>
                            <span><u>Address</u></span>
                       </div>
                       <div>
                           <span>{home.Address}</span>
                       </div> 
                       <div>
                           <span className={styles.city}>{home.City}</span>
                           <span className={styles.statecode}>{home.StateCode},</span>
                           <span>{home.PostalCode}</span>
                       </div>
                    </div>
                    <div className={styles.priceDiv}>
                        <span><u>Listed Price</u></span>
                        <span>${home.ListPrice}</span>
                    </div>
                </div>
            <div onClick={openImgView} className={styles.imgDiv}>
                    {imgClicked === true ? <ImgView images={home.Photos} cur={0} open={setImgClicked} /> : <div><Image className={styles.homeImg} src={home.Photos !== null ? home.Photos[0] : ' '} alt="home" /></div>}
                    {/* original image view */}
                    {/*<img className={styles.homeImg} src={home.Photos !== null ? home.Photos[0] : ' '} /> */}
                </div>
                <div className={styles.textBox}>
                    <div className={styles.descriptionDiv}>
                        <DescriptionBox home={home} />
                    </div>
                    
                    <div className={styles.infoBox}>
                        <p style={{display: 'flex', justifyContent: 'space-between'}}>
                            <p>Bedrooms:</p> <p>{home.Beds}</p> 
                        </p>
                        <p className={styles.infoTextBox}>
                            <p>Baths:</p><p>{home.Baths}</p> 
                        </p>
                        <p className={styles.infoTextBox}>
                            <p>Sqft:</p> <p>{home.Sqft}</p>
                        </p>
                        <p className={styles.infoTextBox}>
                            <p>Lot Size:</p><p>{home.LotSqft} SqFt</p> 
                        </p>
                        <p className={styles.infoTextBox}>
                            <p>Date Listed:</p> <p>{format(new Date(home.ListDate !== null ? home.ListDate : '01/01/2001'), 'MM/dd/yyy')}</p>
                        </p>
                        <p className={styles.infoTextBox}>
                           <p>List Price:</p> <p>${home.ListPrice}</p>
                        </p>
                        <p className={styles.infoTextBox}>
                            <p>Status:</p> <p>{home.Status}</p>
                        </p>
                        <p className={styles.infoTextBox}>
                            <p>MLS#:</p> <p>{home.ListingId}</p>
                        </p>
                    </div>


                </div>

            </div>

        </div>
    )

}

export default HomeInfo;


export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
    if(params == undefined) return
    const id = params.id as string;
    const property: H = await returnSingleHome(id) 
    if(property === undefined){
        return
    }
    return {
            props: {
                property
            }
        }  

}
