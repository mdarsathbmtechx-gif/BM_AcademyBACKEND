import React from 'react'
import CoursesIntroBanner from '../components/Courses/CoursesIntroBanner'
import CoursesList from '../components/Courses/CoursesList'
import Courses from '../components/Courses/Courses'

const Coursesroutes = () => {
    return (
        <div>
            <CoursesIntroBanner/>
            <CoursesList/>
            <Courses/>
        </div>
    )
}

export default Coursesroutes