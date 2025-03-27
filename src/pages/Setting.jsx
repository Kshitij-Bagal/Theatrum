import React, { useState } from "react";
import "../styles/Setting.css";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="settings-container">
            <aside className="settings-sidebar">
                <h2>Settings</h2>
                <ul>
                    <li 
                        className={activeTab === "account" ? "active" : ""}
                        onClick={() => setActiveTab("account")}
                    >
                        Account
                    </li>
                    <li 
                        className={activeTab === "notifications" ? "active" : ""}
                        onClick={() => setActiveTab("notifications")}
                    >
                        Notifications
                    </li>
                    <li 
                        className={activeTab === "privacy" ? "active" : ""}
                        onClick={() => setActiveTab("privacy")}
                    >
                        Privacy
                    </li>
                </ul>
            </aside>

            <main className="settings-content">
                {activeTab === "account" && (
                    <section>
                        <h2>Account Settings</h2>
                        <label>
                            Username: <input type="text" value="Kshitij" readOnly />
                        </label>
                        <label>
                            Email: <input type="email" value="kshitij@example.com" readOnly />
                        </label>
                        <button>Manage Google Account</button>
                    </section>
                )}

                {activeTab === "notifications" && (
                    <section>
                        <h2>Notification Settings</h2>
                        <label>
                            <input type="checkbox" defaultChecked /> Email Notifications
                        </label>
                        <label>
                            <input type="checkbox" /> Push Notifications
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked /> Channel Updates
                        </label>
                    </section>
                )}

                {activeTab === "privacy" && (
                    <section>
                        <h2>Privacy Settings</h2>
                        <label>
                            <input type="checkbox" /> Keep my subscriptions private
                        </label>
                        <label>
                            <input type="checkbox" /> Keep my liked videos private
                        </label>
                        <label>
                            <input type="checkbox" /> Allow comments on my videos
                        </label>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Settings;
