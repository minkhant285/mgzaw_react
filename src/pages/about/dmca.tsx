import React from 'react'
import { Link } from 'react-router-dom'

function DMCA() {
    return (
        <div className='text-white grid grid-cols-5'>
            <div className='hidden md:block col-span-1'></div>
            <div className='col-span-5 md:col-span-3 p-2 '>
                <section>
                    <h1 className="text-2xl font-bold">DMCA Notice of Copyright Infringement</h1>
                    <p className='text-white text-left p-4 leading-6'>
                        In accordance with the Digital Millennium Copyright Act of 1998 (the text of which may be found on the U.S. Copyright Office website at <a href='http://lcweb.loc.gov/copyright' >http://lcweb.loc.gov/copyright</a>), mgzaw (မောင်ဇော်) will respond expeditiously to claims of copyright infringement that are reported to mgzaw (မောင်ဇော်) designated copyright agent identified below.
                        <br />
                        Please also note that under Section 512(f) any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability.
                        <br />
                        <br />
                        Mgzaw (မောင်ဇော်) reserves the right at its sole and entire discretion, to remove content and terminate the accounts of mgzaw (မောင်ဇော်) users who infringe, or appear to infringe, the intellectual property or other rights of third parties.
                        <br />
                        <br />
                        If you believe that your copywriten work has been copied in a way that constitutes copyright infringement, please provide mgzaw (မောင်ဇော်) copyright agent the following information:

                        <ol className="list-decimal list-inside my-2 p-4">
                            <li className='mt-1'> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed; Identification of the copyright work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at the Website.</li>
                            <li className='mt-1'> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit mgzaw (မောင်ဇော်) to locate the material. </li>
                            <li className='mt-1'> Information reasonably sufficient to permit mgzaw (မောင်ဇော်) to contact the complaining party, including a name, address, telephone number and, if available, an email address at which the complaining party may be contacted.</li>
                            <li className='mt-1'> A statement that the complaining party has a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law.</li>
                            <li className='mt-1'> A statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                        </ol>

                        <br />

                        All claims of copyright infringement on or regarding this Website should be delivered to mgzaw (မောင်ဇော်) designated copyright agent at the following address:
                        <Link to={'/contact_us'} target='_blank' className='hover:underline'> Copyright Contact Address</Link>
                        <br />
                        <br />
                        We apologize for any kind of misuse of our service and promise to do our best to find and terminate abusive files.
                    </p>
                </section>
            </div>
            <div className='hidden md:block col-span-1'></div>
        </div>
    )
}

export default DMCA
