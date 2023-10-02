import React, { useEffect, useState } from 'react';
import styles from './DailyNotices.module.css';
import {DailyNotice} from "../../types";

const NOTICE_DISPLAY_TIME = 5000; // Time to display each notice page in milliseconds

/**
 * Displays the daily notices
 * @param noticesData Array of DailyNotice objects
 * @param isLoading Whether the notices are still loading
 * @param isFullScreen Whether the notices are displayed in full screen
 * Can change the number of notices displayed per page and the time to display each notice by changing the constants
 * TODO: Change it to dynamically show the number of notices per page based on the length of the notices
 */
export default function DailyNoticesView({ isFullScreen, noticesData, isLoading }: DailyNoticesProps) {
  //this is the page marker so that we can cycle through pages
  const [currentIndex, setCurrentIndex] = useState(0);

  //this is a one page long array - needed so that we can measure heights of all the notices
  //you can't measure the height until an element is rendered on the page
  const [singlePageNotices, setSinglePageNotices] = useState<DailyNotice[][]>([])

  //this is the notices properly arranged in pages as required for clean pagination
  const [noticePages, setNoticePages] =
    // DailyNotice[][] is a 2D array of DailyNotice, an array containing arrays of DailyNotices for each page
    useState<DailyNotice[][]>([]);
  
  //this is an array of numbers used to store the height of each notice
  const [noticeHeights, setNoticeHeights] = useState<number[]>([])

  //this is a variable to control if all notices should be stored on either:
  // - a single overflowing page (for measurement purposes)
  // - paginated
  const [renderedSingle, setRenderedSingle] = useState(true)

  //This variable is needed to stop the initial useEffect to break notices into pages
  //no idea but I couldn't get it working without this
  const [initialRender, setInitialRender] = useState(false)

  //effect to run when the notice data changes
  //it puts all notices on a single page so we can measure them
  useEffect(() => {
    setRenderedSingle(true)
    // Filter notices that are valid for today
        const validNotices = noticesData.filter((notice) => {
            const startDate = new Date(notice.startDate);
            const endDate = new Date(notice.expiryDate);
            return startDate <= new Date() && endDate >= new Date();
        });

        // Sort notices by start date (descending)
        validNotices.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

        const pages = []
        pages.push(validNotices)
        setSinglePageNotices(pages);
    }, [noticesData]); // Only run this effect when noticesData changes (i.e. when notices are fetched)


  // measure heights of each notice and store in array
  useEffect(() => {
    const timer = setTimeout(() => {

        const noticeHolder = document.getElementById('notices')
        const noticesAmount = noticeHolder?.children.length
        let noticeHeights = []
        if (noticesAmount != undefined && noticeHolder != undefined ){
            for (let i = 0; i < noticesAmount; i++) {
                noticeHeights.push(noticeHolder.children[i].clientHeight)
            }
        }
        setNoticeHeights(noticeHeights)
    }, 2000)

    return () => {clearInterval(timer)}

  }, [singlePageNotices])




  // Rearrange the notices onto pages for dynamic pagination
  useEffect(() => {
    if (initialRender) {
        // Filter notices that are valid for today
        const validNotices = noticesData.filter((notice) => {
            const startDate = new Date(notice.startDate);
            const endDate = new Date(notice.expiryDate);
            return startDate <= new Date() && endDate >= new Date();
        });
    
        // Sort notices by start date (descending)
        validNotices.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    
        const pages = []
        let index = 0;
        //declare an empty array to use as a holder
        let page = []
        //declare a counter to measure the height of a page
        let pageHeight = 0
        //loop through the array of notices.
        while (index < validNotices.length) {
            //add the notice to the page if the page is empty, or if the notice fits
            if (pageHeight === 0 || (pageHeight + noticeHeights[index]) < 700 ) {
                page.push(validNotices[index])
                pageHeight+= noticeHeights[index]
                index++
            //if it doesn't fit, add the current page to pages, and make a new one
            } else {
                pages.push([...page])
                page.length = 0
                pageHeight = 0
            }
        }
        //push the last page into pages
        if (page.length > 0) {
            pages.push(page)
        }

        setNoticePages(pages);
        setRenderedSingle(false)
    
    } else {
        setInitialRender(true)
    }
  }, [noticeHeights])

  // Effect to cycle through pages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % noticePages.length);
    }, NOTICE_DISPLAY_TIME);

    return () => clearInterval(timer);
  }, [noticePages]);


  if (isLoading) {
    return <p>Loading notices...</p>;
  }

  if (!noticesData) {
    return <p>No notices available</p>;
  }

  const containerStyle = isFullScreen? styles.fullScreen : styles.multiScreen
  return (
    <div className={containerStyle} >
      <div className={styles.title}>Today's Notices</div>
      <div className={styles.noticesInfoContainer} id = "notices">
        {/* Only map the notices of the notice array that is the current index (the current page) */}
        {/* '&&' operator is used to check if the array is not empty before mapping, JSX cannot do 'if' statements,
         please see
         https://legacy.reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator and
         https://react.dev/learn/conditional-rendering#logical-and-operator-*/}

         {/* dislay all notices on one page so we can measure them */}
        {singlePageNotices.length > 0 && 
          renderedSingle &&
          singlePageNotices[currentIndex].map((notice, index) => (
          <div className={styles.notice} key={index}>
            <div className={styles.noticeTitle}>{notice.title}</div>
            <div className={styles.noticeContent}>{notice.message}</div>
          </div>
        ))}
         {/* dislay only the current page of notices*/}
         {noticePages.length > 0 && 
          !renderedSingle &&
          noticePages[currentIndex].map((notice, index) => (
          <div className={styles.notice} key={index}>
            <div className={styles.noticeTitle}>{notice.title}</div>
            <div className={styles.noticeContent}>{notice.message}</div>
          </div>
        ))}      </div>
        <div className={styles.indicatorContainer}>
        {noticePages.map((page, index) => (
          <div key={index} className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}></div>
        ))}
      </div>
    </div>
  );
}

interface DailyNoticesProps {
  noticesData: Array<DailyNotice>
  isLoading: boolean;
  isFullScreen: boolean;
}
