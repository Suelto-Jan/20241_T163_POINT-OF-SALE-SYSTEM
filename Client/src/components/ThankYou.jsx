import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, Row, Col, Space } from 'antd';
import { LogoutOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve purchase details from location.state or fallback to localStorage
  const { product, quantity, totalPrice, paymentMethod, user } =
    location.state || JSON.parse(localStorage.getItem('lastPurchase')) || {};

  useEffect(() => {
    // If state is missing, check localStorage for fallback data
    if (!product || !user) {
      const fallbackData = JSON.parse(localStorage.getItem('lastPurchase'));
      if (!fallbackData) {
        // Redirect to home if no fallback data
        navigate('/');
      }
    } else {
      // Save current purchase details in localStorage for backup
      localStorage.setItem(
        'lastPurchase',
        JSON.stringify({ product, quantity, totalPrice, paymentMethod, user })
      );
    }
  }, [product, user, quantity, totalPrice, paymentMethod, navigate]);

  // Auto-navigate to the scan page after a delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/scan');
    }, 10000); // Adjust delay (e.g., 10 seconds)

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // Clear all stored user data
    navigate('/login-selection'); // Redirect to login page
  };

  // If no valid data is found, show the error
  if (!product || !user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Card
          style={{
            maxWidth: 400,
            textAlign: 'center',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          <Title level={2} style={{ color: '#ff4d4f' }}>
            Error
          </Title>
          <Text>No purchase details found.</Text>
          <Divider />
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            Go Back Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        color: 'white',
      }}
    >
      <Card
        style={{
          maxWidth: 600,
          width: '100%',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
          <CheckCircleOutlined
            style={{
              fontSize: '64px',
              color: '#4caf50',
              marginBottom: '16px',
            }}
          />
          <Title level={2} style={{ color: '#4b6cb7' }}>
            Thank You for Your Purchase!
          </Title>
          <Text>Your transaction was successful.</Text>
        </Space>
        <Divider />
        <Title level={4} style={{ textAlign: 'center', color: '#4b6cb7' }}>
          Receipt
        </Title>
        
        {/* Product Image Section */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img
            src={product.imageURL}  // Assuming 'imageURL' holds the image path or URL
            alt={product.name}
            style={{ width: '100%', maxWidth: '200px', objectFit: 'contain' }}
          />
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          <Col span={12}>
            <Text strong>Purchased By:</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>
              {user.firstname} {user.lastname}
            </Text>
          </Col>
          <Col span={12}>
            <Text strong>Product:</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>{product.name}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Quantity:</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>{quantity}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Price:</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>₱{product.price.toFixed(2)}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Total Price:</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>₱{totalPrice.toFixed(2)}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Payment Method:</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>{paymentMethod}</Text>
          </Col>
        </Row>
        <Divider />
        <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
          <Text style={{ fontStyle: 'italic', color: '#888' }}>
            We hope to see you again!
          </Text>
          <Button
            type="primary"
            style={{ background: '#4b6cb7', borderColor: '#4b6cb7' }}
            onClick={() => navigate('/scan')}
          >
            Scan Another Product
          </Button>
          <Button
            type="text"
            style={{ color: '#f44336', marginTop: '8px' }}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default ThankYou;
