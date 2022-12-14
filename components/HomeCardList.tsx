import HomeCard from "./HomeCard";
import { type H } from '../utils/houseType'
import { useState, useEffect, useRef } from "react";

type CompProps = {
    homes: H[]
    selected?: H
}

const HomeCardList = ({ homes, selected }: CompProps) => {
    const indexListRef = useRef<Object[]>([])
    const refs = useRef<(HTMLDivElement | null)[]>([])
    // const selectedIndex = homes.map((home: H, index: number) => {
    //         if(selected?.listId === home.listId){
    //            return { index: index } 
    //         }
    //     })
    // console.log('SELECTED INDEX', selectedIndex)
    useEffect(() => {
        console.log('INDEX LIST REF',indexListRef)
        const findRef = indexListRef.current.filter((obj: any) => obj.homeId === selected?.listId)
        if(findRef) {
            const idx: number[] = findRef.map((ref: any) => {
                const num: number = ref.ind
                return num
            })
            console.log('Selected FINDREFFF---->>>', findRef)
            const curRef = refs.current.find((ref: any, index: number) => index === idx[0] )
            console.log("CURRENT REF TO HIGLIGHT ===>>>", curRef) 
            curRef?.scrollIntoView({ behavior: "smooth"})
        }
    }, [selected])

    return (
        <div >
            {homes.map((home: H, index: number) => {
                // set the list of indexes for the refs
                let selectedHome = false
                const listCheck = indexListRef.current.find((ref: any) => ref.homeId === home.listId)
                if(listCheck == undefined){
                    indexListRef.current.push({homeId: home.listId, ind: index})
                }
                if(selected?.listId === home.listId){
                    selectedHome = true
                }
                // return the homecard and div
                return  (
                    <div ref={(element) => {refs.current[index] = element}} key={index} >
                        <HomeCard home={home} key={index} selected={selectedHome}/>
                    </div>
                )})}
        </div>

    )


}

export default HomeCardList;
