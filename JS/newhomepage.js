const content = {
    segment1: {
        left: `<h3>Language Learning</h3>
               <p>Building foundational communicative and language skills through immersive and engaged learning experiences and structured courses.</p>`,
        right: ``
    },
    segment2: {
        left: ``,
        right: `<h3>Community Building</h3>
                <ul>
                    <li>Univ. Language Table</li>
                    <li>Univ. Language Events</li>
                    <li>Univ. Conversation Exchanges</li>
                </ul>
                <p>Connect with others and practice language skills in informal settings.</p>`
    },
    segment3: {
        left: `<h3>Duration</h3>
               <p><strong>Short term</strong> (winter/summer)</p>
               <p><strong>1 semester</strong></p>
               <p><strong>2 semesters</strong></p>`,
        right: `<h3>Study Abroad with University Programs</h3>
                <p>Experience education in a different cultural context through established university partnerships.</p>`
    },
    segment4: {
        left: `<h3>Fellowship Programs</h3>
               <ul>
                   <li>Chateaubriand</li>
                   <li>Eiffel Excellence</li>
                   <li>Fulbright (U.S.)</li>
                   <li>Lafayette (FR)</li>
                   <li>TAPIF (FR)</li>
                   <li>Etc.</li>
               </ul>`,
        right: ``
    },
    segment5: {
        left: ``,
        right: `<h3>Internship</h3>
                <p><strong>Professional Experiences</strong></p>
                <p>Apply language skills in real-world professional settings and gain valuable career experience.</p>`
    },
    segment6: {
        left: ``,
        right: `<h3>Study Abroad</h3>
                <p><strong>New Degree in a new country</strong></p>
                <p>Pursue part of/a complete degree program in an international setting for deep cultural immersion.</p>`
    },
    segment7: {
        left: ``,
        right: `<h3>Working Abroad</h3>
                <p>Full professional immersion in an international workplace, utilizing advanced language skills and cultural competency.</p>`
    }
};

function setActiveSegment(segmentId) {
    const segments = document.querySelectorAll('.segment');
    segments.forEach(seg => seg.classList.remove('active'));
    
    const activeSegment = document.getElementById(segmentId);
    if (activeSegment) {
        activeSegment.classList.add('active');
    }
    
    const leftText = document.getElementById('left-text');
    const rightText = document.getElementById('right-text');
    
    leftText.innerHTML = content[segmentId].left;
    rightText.innerHTML = content[segmentId].right;
    
    leftText.style.opacity = '0';
    rightText.style.opacity = '0';
    
    setTimeout(() => {
        leftText.style.transition = 'opacity 0.5s ease';
        rightText.style.transition = 'opacity 0.5s ease';
        leftText.style.opacity = '1';
        rightText.style.opacity = '1';
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    const segments = document.querySelectorAll('.segment');
    
    segments.forEach((segment, index) => {
        segment.addEventListener('click', () => {
            setActiveSegment(segment.id);
        });
    });
    
    setActiveSegment('segment1');
});