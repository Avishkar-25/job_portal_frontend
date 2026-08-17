import React, { useEffect, useState } from "react";
import api from "../../../../services/api";

import CompanyHeader from "./CompanyHeader";
import CompanyInformation from "./CompanyInformation";
import CompanyAddress from "./CompanyAddress";
import CompanyDetails from "./CompanyDetails";
import CompanySocialLinks from "../components/CompanySocialLinks";
import CompanyAccount from "./CompanyAccount";

import "./CompanyProfile.css";

const CompanyProfile = () => {

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCompanyProfile();
    }, []);

    // =====================================================
    // GET COMPANY PROFILE
    // =====================================================

    const getCompanyProfile = async () => {

        try {

            const response = await api.get("/company/profile");

            if (response.data.success) {
                setCompany(response.data.company);
            }

        } catch (error) {

            console.error(
                "Company profile error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // UPLOAD LOGO
    // =====================================================

    const uploadLogo = async (file) => {

        const formData = new FormData();

        formData.append("logo", file);

        const response = await api.post(
            "/company/profile/logo",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (response.data.success) {

            setCompany((prev) => ({
                ...prev,
                logo: response.data.logo
            }));

        }

        return response.data;
    };


    // =====================================================
    // UPLOAD COVER
    // =====================================================

    const uploadCover = async (file) => {

        const formData = new FormData();

        formData.append("cover_image", file);

        const response = await api.post(
            "/company/profile/cover",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (response.data.success) {

            setCompany((prev) => ({
                ...prev,
                cover_image: response.data.cover_image
            }));

        }

        return response.data;
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="profile-loading">

                <div className="spinner-border text-primary"></div>

                <p>
                    Loading company profile...
                </p>

            </div>
        );

    }


    // =====================================================
    // PROFILE NOT FOUND
    // =====================================================

    if (!company) {

        return (
            <div className="profile-empty">

                <i className="fas fa-building"></i>

                <h3>
                    Company profile not found
                </h3>

            </div>
        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="company-profile-page">

            {/* COMPANY HEADER */}

            <div className="company-profile-card">

                <CompanyHeader
                    company={company}
                    setCompany={setCompany}
                    uploadLogo={uploadLogo}
                    uploadCover={uploadCover}
                />

            </div>


            {/* COMPANY INFORMATION */}

            <CompanyInformation
                company={company}
                setCompany={setCompany}
            />


            {/* ADDRESS */}

            <CompanyAddress
                company={company}
                setCompany={setCompany}
            />


            {/* LEGAL DETAILS */}

            <CompanyDetails
                company={company}
                setCompany={setCompany}
            />


            {/* SOCIAL */}

            <CompanySocialLinks
                company={company}
                setCompany={setCompany}
            />


            {/* ACCOUNT */}

            <CompanyAccount
                company={company}
            />

        </div>
    );
};

export default CompanyProfile;